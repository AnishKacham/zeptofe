"use client";
import { useState, useRef, useEffect, ChangeEvent, Ref } from "react";
import Image from "next/image";

type IPerson = {
  name: string;
  email: string;
  url: string;
};

export default function BadgeInput() {
  const People: IPerson[] = [
    {
      name: "Timothy",
      email: "tim@example.com",
      url: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Anish",
      email: "anish@example.com",
      url: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Sonu Nigam",
      email: "sonu@example.com",
      url: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Shreya Ghoshal",
      email: "shreya.g@example.com",
      url: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Sudhanshu",
      email: "sudhanshu@example.com",
      url: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Nirav",
      email: "p.nirav@example.com",
      url: "https://i.pravatar.cc/150?img=13",
    },
    {
      name: "Ranbir Kapoor",
      email: "r.kapoor@example.com",
      url: "https://i.pravatar.cc/150?img=15",
    },
    {
      name: "Sachin Tendulkar",
      email: "s.tendulkar@example.com",
      url: "https://i.pravatar.cc/150?img=11",
    },
    {
      name: "Bhavesh",
      email: "bhavesh@example.com",
      url: "https://i.pravatar.cc/150?img=10",
    },
    {
      name: "Advika",
      email: "advika.s@example.com",
      url: "https://i.pravatar.cc/150?img=20",
    },
    {
      name: "Jonathan Samuel",
      email: "joe4k@example.com",
      url: "https://i.pravatar.cc/150?img=18",
    },
    {
      name: "AP Rao",
      email: "apdhillon@example.com",
      url: "https://i.pravatar.cc/150?img=17",
    },
  ];

  const [people, setPeople] = useState<IPerson[]>([]);
  const [searchvalue, setSearchValue] = useState<string>("");
  const [dropDownVisible, setDropDownVisibility] = useState<boolean>(false);
  const [peopleInDropDown, setPeopleInDropDown] = useState<IPerson[]>(People);
  const inputFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleBackspaceofInput = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && inputFieldRef.current?.value === "") {
        const targettedElement = inputFieldRef.current.parentElement
          ?.parentElement?.lastChild?.previousSibling as HTMLElement;

        targettedElement?.focus();
      }
    };

    inputFieldRef.current?.addEventListener("keyup", handleBackspaceofInput);

    return () => {
      inputFieldRef.current?.removeEventListener(
        "keyup",
        handleBackspaceofInput
      );
    };
  }, []);

  const handleBackSpaceOnBadge = (person: IPerson) => {
    handlePersonDelete(person);
  };

  const handleEnterOnDropDownPerson = (person: IPerson) => {
    handlePersonInsert(person);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchFocus = () => {
    setDropDownVisibility(true);
  };

  const handlePersonInsert = (person: IPerson) => {
    setPeople([...people, person]);
    setPeopleInDropDown(
      peopleInDropDown.filter((p) => p.email != person.email)
    );
    setDropDownVisibility(false);
    inputFieldRef.current?.focus();
  };

  const handlePersonDelete = (person: IPerson) => {
    setPeople(people.filter((p) => p.email != person.email));
    setPeopleInDropDown([...peopleInDropDown, person]);
    setDropDownVisibility(false);
    inputFieldRef.current?.focus();
  };

  const searchFilter = (searchValue: string, people: IPerson[]) => {
    let lowerCaseSearchValue = searchValue.toLowerCase();
    let filteredPeople = people.filter((p) =>
      p["name"].toLowerCase().includes(lowerCaseSearchValue)
    );
    return filteredPeople;
  };

  const boldSearchText = (pname: string, searchval: string) => {
    const pnameLowerCase = pname.toLowerCase();
    const searchValLowerCase = searchval.toLowerCase();

    const lenOfSearchVal = searchValLowerCase.length;
    const indexOfSubstr = pnameLowerCase.indexOf(searchValLowerCase);
    const toBold = pname.slice(indexOfSubstr, indexOfSubstr + lenOfSearchVal);

    return pname.replace(toBold, "<b>" + toBold + "</b>");
  };

  return (
    <div className="flex flex-row justify-start w-full rounded-sm p-2 gap-2 flex-wrap bg-white">
      {people.map((person, i) => {
        return (
          <div
            onKeyUp={(e) => {
              if (e.key === "Backspace") handleBackSpaceOnBadge(person);
            }}
            id={person.email}
            tabIndex={1}
            key={person.email}
            className="rounded-full flex flex-row gap-1 focus:bg-slate-300 focus:border-2 focus:border-red-400 border-slate-400 border-2 items-center pr-2"
          >
            <Image
              alt={person.name}
              src={person.url}
              width={28}
              height={28}
              className="rounded-full ring-2 ring-slate-400 focus:ring-red-400 focus:ring-2"
            />
            <span className="text-center w-fit text-nowrap">{person.name}</span>
            <svg
              onClick={() => {
                handlePersonDelete(person);
              }}
              className="w-4 h-4 text-slate-400 text-nowrap"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
          </div>
        );
      })}
      <div className="flex flex-grow">
        <input
          onChange={handleSearchChange}
          value={searchvalue}
          placeholder="Search for people . . ."
          className="focus:outline-none h-[32px] w-full"
          onFocus={handleSearchFocus}
          ref={inputFieldRef}
        />
        {dropDownVisible ? (
          <ol className="flex flex-col border-2 rounded-md py-2 absolute translate-y-8 bg-white w-64 drop-shadow-lg max-h-96 overflow-y-auto">
            {searchFilter(searchvalue, peopleInDropDown).map((person, i) => {
              return (
                <li
                  id={person.email}
                  tabIndex={0}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") handleEnterOnDropDownPerson(person);
                  }}
                  onClick={() => {
                    handlePersonInsert(person);
                  }}
                  key={person.email}
                  className="flex flex-row focus:bg-slate-200 gap-2 items-start sm:items-center p-1 hover:bg-slate-200 hover:cursor-pointer flex-wrap"
                >
                  <img
                    src={person.url}
                    alt={person.name}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                  <span className="flex flex-col">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: boldSearchText(person.name, searchvalue),
                      }}
                    />
                    <span className="text-xs">{person.email}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        ) : null}
      </div>
    </div>
  );
}
