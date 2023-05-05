import { useEffect, useMemo, useState } from "react";
import { PageWrapper } from "../../../ui/wrappers/PageWrapper";
import { Wrapper } from "../../../ui/wrappers/Wrapper";
import { useUsers } from "../../../../hooks/user/useUsers";
import { Button } from "../../../ui/buttons/Button";
import { handleImageError, processImage } from "../../../../utils/utils";
import { Modal } from "../../../ui/modals/NewModal";
import { BanMenu } from "../BanMenu/intex";
import { PaginationPanel } from "../../../ui/PaginationPanel";
import {
  PageConfig,
  getOffset,
  getPageCount,
} from "../../../../utils/pageUtils";
import { Link } from "react-router-dom";
import { Router } from "../../../router";

export const AdminHomePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const params = useMemo(
    () => ({
      limit: PageConfig.LIMIT,
      offset: getOffset(currentPage, PageConfig.LIMIT),
    }),
    [currentPage]
  );
  const { users, count, banUser, refetch, isUpdateLoading } = useUsers(
    {
      disabled: false,
      role: "USER",
      ...params,
    },
    0
  );

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  useEffect(() => {
    refetch();
  }, [params]);

  const handleBanUser = (id: string, data) => {
    banUser({ id, ...data });
    setModalIsOpen(false);
  };

  return (
    <div className="flex w-full flex-col items-center justify-between overflow-hidden">
      <Wrapper className="">
        {users && (
          <div className="flex flex-col gap-y-10">
            <PageWrapper
              isTop={true}
              title="Пользователи"
              className="w-full text-xl"
            >
              {users.map(({ id, name, img, email, autobiography }, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b-2 pb-2"
                >
                  <Link
                    to={`${Router.users}/${id}`}
                    className="flex text-lg"
                  >
                    <img
                      className="mr-5 h-32 w-32 object-cover"
                      src={processImage(img)}
                      alt=""
                      onError={handleImageError}
                    />
                    <div className="flex flex-col gap-y-2">
                      <div className="font-medium">{name}</div>
                      <div>{email}</div>
                      <div className="line-clamp-2">{autobiography}</div>
                    </div>
                  </Link>
                  <div>
                    <Button
                      onClick={() => {
                        setId(`${id}`);
                        setModalIsOpen(true);
                      }}
                    >
                      Забанить
                    </Button>
                  </div>
                </div>
              ))}
              <PaginationPanel
                pageCount={getPageCount(Number(count), PageConfig.LIMIT)}
                onClick={handlePageClick}
                currentPage={currentPage}
              />
            </PageWrapper>
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
              <BanMenu
                onClick={(data) => handleBanUser(`${id}`, data)}
                isLoading={isUpdateLoading}
              />
            </Modal>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
