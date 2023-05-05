import { useState } from "react";
import { useParams } from "react-router-dom";
import { useContest } from "../../../../hooks/contests/useContest";
import { Button } from "../../../ui/buttons/Button";
import { useModerators } from "../../../../hooks/contests/useModeration";
import { Spinner } from "../../../ui/Spinner";
import { Modal } from "../../../ui/modals/NewModal";
import { Wrapper } from "../../../ui/wrappers/Wrapper";
import { ModerationMenu } from "../ModertionMenu";
import { SelectWinner } from "../SelectWinner";
import { Link } from "react-router-dom";
import { Router } from "../../../router";

export const ContestAdminPage = () => {
  const { id } = useParams();
  const { contest } = useContest({ contestId: id });
  const [moderatorModalIsOpen, setModeratorModalIsOpen] = useState(false);
  const [winnerModalIsOpen, setWinnerModalIsOpen] = useState(false);
  const { moderators, count, addModerator, removeModerator } = useModerators(
    id!
  );

  const handleAddModeration = (userId: number) => {
    const body: any = { userId, contestId: Number(id) };
    addModerator(body);
    setModeratorModalIsOpen(false);
  };

  return (
    <Wrapper>
      {contest ? (
        <div>
          <div className="mb-10 mt-5 text-center">
            {contest.contestWinner ? (
              <Link
                className=" text-xl text-blue-700 hover:cursor-pointer hover:text-blue-600 hover:underline"
                to={`${Router.absoluteBooks}/${contest.contestWinner.bookId}`}
              >
                Победитель уже определен
              </Link>
            ) : (
              <Button
                disabled={!contest.status}
                title={
                  !contest.status
                    ? "Будет доступна после завершения конкурса"
                    : ""
                }
                onClick={() => setWinnerModalIsOpen(true)}
              >
                Определить победителя
              </Button>
            )}
          </div>
          <div>
            <h2 className=" mb-5 text-2xl">Модерация конкурса</h2>
            <div className="flex justify-between">
              <div className="w-1/2 pr-32">
                {moderators && moderators.length ? (
                  moderators.map(({ user, id: moderationId }, i) => (
                    <div
                      className="mb-3 flex justify-between border-b-2 p-1"
                      key={i}
                    >
                      <span className=" flex flex-col justify-center overflow-hidden text-ellipsis whitespace-nowrap">
                        {user.name}
                      </span>
                      <Button
                        onClick={() => removeModerator(`${moderationId}`)}
                        className="border-red-500 bg-red-500 p-0 hover:border-green-500 hover:bg-green-500"
                      >
                        Снять
                      </Button>
                    </div>
                  ))
                ) : moderators ? (
                  <h3>Модераторы не назначены</h3>
                ) : (
                  <Spinner />
                )}
              </div>
              <Button
                disabled={count! >= 2}
                title={
                  count! >= 2 ? "Нельзя добавить больше двух модераторов" : ""
                }
                onClick={() => setModeratorModalIsOpen(true)}
                className="m-auto w-1/4"
              >
                Добавить модератора
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      <Modal
        isOpen={moderatorModalIsOpen}
        onClose={() => setModeratorModalIsOpen(false)}
      >
        <ModerationMenu onClick={handleAddModeration} />
      </Modal>
      <Modal
        isOpen={winnerModalIsOpen}
        onClose={() => setWinnerModalIsOpen(false)}
      >
        <SelectWinner contestId={id!} />
      </Modal>
    </Wrapper>
  );
};
