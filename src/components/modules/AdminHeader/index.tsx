import { Link } from "react-router-dom";
import { Wrapper } from "../../ui/wrappers/Wrapper";
import { ReactComponent as Logo } from "../../../common/assets/icons/logo.svg";
import { Burger } from "../../ui/buttons/Burger";
import { CloseButton } from "../../ui/buttons/CloseButton";
import { useState } from "react";
import { Router } from "../../router";

const navItems = [
  {
    title: "Пользователи",
    link: "",
  },
  {
    title: "Книги",
    link: "books",
  },
  {
    title: "Заявки",
    link: "applications",
  },
];

export const AdminHeader = () => {
  const [burgerMenuDisplay, setBurgerMenuDisplay] = useState(false);

  return (
    <header className="fixed z-10 flex h-16 w-full justify-center bg-white bg-opacity-60 shadow backdrop-blur-sm">
      <Wrapper className="flex items-center justify-between">
        <Link to={Router.main}>
          <Logo className="sm:mr-5 lg:mr-10" />
        </Link>
        <nav
          className={`${
            burgerMenuDisplay ? "flex" : "hidden"
          } absolute left-0 top-0 h-screen w-screen flex-col items-center bg-white py-8 sm:relative sm:flex sm:h-auto sm:w-auto sm:flex-grow sm:flex-row sm:justify-between sm:bg-transparent sm:py-0`}
        >
          <div className="flex flex-col items-center sm:flex-row sm:gap-2 lg:gap-4">
            {navItems.map((item) => (
              <Link
                to={item.link}
                key={item.title}
                className="my-2 w-full text-center hover:text-indigo-400 sm:my-0 sm:w-auto sm:text-sm lg:text-lg"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <CloseButton
            onClick={() => setBurgerMenuDisplay(!burgerMenuDisplay)}
            className="sm:hidden"
          />
        </nav>
        <div className="flex items-center gap-x-2 ">
          <Burger
            onClick={() => setBurgerMenuDisplay(!burgerMenuDisplay)}
          ></Burger>
        </div>
      </Wrapper>
    </header>
  );
};
