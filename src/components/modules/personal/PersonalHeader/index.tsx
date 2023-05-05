import { Wrapper } from "../../../ui/wrappers/Wrapper";
import "./gradient.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";
import { AccountType } from "../../../../types/types";
import avatar from "../../../../common/assets/images/avatar.png";
import { Router } from "../../../router";
import { getLastPathWord, processImage } from "../../../../utils/utils";
import { Button } from "../../../ui/buttons/Button";
import { Modal } from "../../../ui/modals/NewModal";
import { UserMenu } from "../UserMenu";

export interface PersonalHeaderProps {
  account: AccountType;
}

const DEFAULT_STYLE = `hover:text-indigo-800 hover:border-indigo-800 text-indigo-800 border-indigo-600`;

export const PersonalHeader = ({ account }: PersonalHeaderProps) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(getLastPathWord());
  const { id } = useParams();
  const { setSelectedUser, user } = useUserContext();
  const isPageOwner = useMemo(() => `${user?.id}` === id, [user, id]);

  useEffect(() => {
    if (account) setSelectedUser(account);
  }, []);

  return (
    <Wrapper className="mb-10 flex h-72 w-full flex-col justify-between rounded-md bg-slate-100 p-4 pt-24 sm:pt-24">
      <div className="flex w-full gap-x-5">
        <img
          src={processImage(account.img)}
          alt=""
          className="h-32 w-32 rounded border object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = avatar;
          }}
        />
        <h3 className="flex items-center text-lg text-gray-900">
          {account.name}
        </h3>
      </div>
      <div className="flex w-full flex-wrap gap-2 ">
        <Button
          onClick={() => {
            setSelectedButton(Router.books);
            navigate(Router.books);
          }}
          type="secondary"
          className={`${Router.books === selectedButton ? DEFAULT_STYLE : ""}`}
        >
          Книги
        </Button>
        <Button
          onClick={() => {
            setSelectedButton(Router.blogs);
            navigate(Router.blogs);
          }}
          type="secondary"
          className={`${Router.blogs === selectedButton ? DEFAULT_STYLE : ""}`}
        >
          Блог
        </Button>
        <Button
          onClick={() => {
            setSelectedButton(Router.contest);
            navigate(Router.contest);
          }}
          type="secondary"
          className={`${Router.contest === selectedButton ? DEFAULT_STYLE : ""}`}
        >
          Конкурс
        </Button>
        <Button
          type="secondary"
          onClick={() => {
            setSelectedButton(Router.about);
            navigate(Router.about);
          }}
          className={`${Router.about === selectedButton ? DEFAULT_STYLE : ""}`}
        >
          Обо мне
        </Button>
        {isPageOwner && (
          <Button className="" onClick={() => setModalIsOpen(true)}>
            Другое
          </Button>
        )}
      </div>

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <UserMenu />
      </Modal>
    </Wrapper>
  );
};

export default PersonalHeader;
