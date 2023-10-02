import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaQuestionCircle } from "react-icons/fa";

import { toast } from "react-toastify";
import "../CSS/pages/ticket.css";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../components/ButtonBack";
import Kspinner from "../assets/Kspinner";
function Ticket() {
  const { ticket, isSuccess, isLoading, message, isError } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate("/tickets");
    }
    dispatch(getTicket(params.id));
  }, [dispatch, isError, params.id, navigate, isSuccess, message]);
  const onCloseTicket = () => {
    dispatch(closeTicket(params.id));
  };
  return (
    <div className="main-one-ticket">
      <div className="one-ticket">
        <div className="one-ticket-titles">
          <h1>view ticket</h1>
          <ButtonBack url={"/tickets"} />
        </div>

        {isLoading ? (
          <div className="ticket-loading">
            <Kspinner />
          </div>
        ) : (
          <div className="ticket-data-list">
            <div className="one-ticket-header ">
              <ul className="one-ticket-info ">
                <li>
                  <div className="all-form-label one-ticket-label ">
                    ticket:
                  </div>
                  <div className="all-form-label one-ticket-text">
                    {" "}
                    {ticket._id}
                  </div>
                </li>
                <li>
                  <div className="all-form-label one-ticket-label2 ">
                    submitted date:
                  </div>
                  <div className="all-form-label one-ticket-text2">
                    {new Date(ticket.createdAt).toLocaleString("en-NZ")}
                  </div>
                </li>
              </ul>

              <div className="all-form-box one-ticket-status-box">
                <label className="all-form-label all-T-c">status</label>
                <button
                  className={
                    ticket.status === "closed"
                      ? "all-btn-submit one-ticket-active all-B-navy "
                      : "all-btn-submit one-ticket-active "
                  }
                  disabled={true}
                >
                  {ticket.status}
                </button>
              </div>
            </div>
            <main className="one-ticket-body">
              <div className="all-boxes">
                <div className="all-box">
                  <label htmlFor="" className="all-name-label all-c-g ">
                    product name
                  </label>
                  <h1 className="all-name ticktet-font .all-TT-cap">
                    {ticket.product}
                  </h1>
                </div>
                <div className="all-box">
                  <label htmlFor="" className="all-name-label all-c-g ">
                    purchase date
                  </label>
                  <h1 className="all-name ticktet-font all-TT-cap all-T-c">
                    {ticket.purchase_date}
                  </h1>
                </div>
              </div>
              <div className="all-box all--10px">
                <label htmlFor="" className="all-name-label all-c-g ">
                  issue
                </label>
                <h1 className="all-name ticktet-font all-TT-cap ">
                  {ticket.problem}
                </h1>
              </div>
              {/* stage one */}
              <div className="all-boxes one-ticket-boxes OT-stage">
                <div className="all-boxes">
                  <div className="all-box">
                    <label htmlFor="" className="all-name-label all-c-g ">
                      stage one
                    </label>
                    <h1 className="all-name all-fz-18px .all-TT-cap all-FAC">
                      comfirmed <FaQuestionCircle />
                    </h1>
                  </div>
                  <div className="all-box">
                    <label htmlFor="" className="all-name-label all-c-g ">
                      warranty status
                    </label>
                    <h1 className="all-name all-fz-18px all-TT-cap all-T-c all-c-green">
                      active
                    </h1>
                  </div>
                </div>

                {/* COMMENT */}
                <div className=" all-box OT-stage-comment">
                  <label htmlFor="" className="all-name-label all-c-g ">
                    message:
                  </label>
                  {ticket.status === "active" && (
                    <h1 className="all-name">
                      We kindly request that you bring the product experiencing
                      issues back to our shop so that we can promptly address
                      and resolve the problem to your satisfaction
                    </h1>
                  )}
                  {ticket.status === "closed" && (
                    <h1 className="all-name all-c-red">
                      this ticket is closed
                    </h1>
                  )}
                </div>
              </div>
            </main>
            {ticket.status !== "closed" && (
              <div className="ticket-close-box">
                <button
                  className="all-btn-submit all-H-40px all-fz-25px all-W-100pc all-B-red "
                  onClick={onCloseTicket}
                >
                  close ticket
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Ticket;
