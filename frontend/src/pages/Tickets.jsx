import React, { useEffect } from "react";
import "../CSS/pages/tickets.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonBack from "../components/ButtonBack";
import { FaFrown } from "react-icons/fa";

import Kspinner from "../assets/Kspinner";
import { getTickets } from "../features/tickets/ticketSlice";
import { toast } from "react-toastify";
function Tickets() {
  const { tickets, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTickets());
  }, [dispatch, isError, isSuccess, message]);

  return (
    <div className="main-Tickets">
      <div className="m-Tickets">
        <div className="Tickets">
          <div className="all-boxes Tickets-title ">
            <h1>my tickets</h1>
            <ButtonBack url={"/"} />
          </div>
          {isLoading ? (
            <div className="Tickets-loading">
              <Kspinner />
              <h1>please wait</h1>
            </div>
          ) : (
            <>
              {tickets && tickets.length > 0 ? (
                <div className="Tickets-lists">
                  <ul className="Tickets-header-list">
                    <li className="Tickets-date">date</li>
                    <li className="Tickets-product">product</li>
                    <li className="tickets-btns">
                      <div className="Tickets-status ">status</div>
                      <div className="Tickets-view">view</div>
                    </li>
                  </ul>
                  {tickets.map((ticket, index) => (
                    <ul key={index} className="Tickets-data-list">
                      <li className="Tickets-date">
                        {new Date(ticket.createdAt).toLocaleString("en-NZ")}
                      </li>
                      <li className="Tickets-product">{ticket.product}</li>
                      <li className="tickets-btns">
                        <div
                          className={
                            ticket.status === "closed"
                              ? "Ticket-status all-B-navy"
                              : "Ticket-status all-B-green"
                          }
                        >
                          {ticket.status}
                        </div>
                        <Link
                          to={`/ticket/${ticket._id}`}
                          className="Ticket-view"
                        >
                          view
                        </Link>
                      </li>
                    </ul>
                  ))}
                  {/* data */}
                </div>
              ) : (
                <div className="Tickets-loading">
                  <FaFrown className="Tickets-none-icon" />
                  <h1>there are no tickets submitted under your account</h1>
                </div>
              )}
            </>
          )}

          {/* <h2>all your tickets are here </h2> */}
        </div>
      </div>
    </div>
  );
}

export default Tickets;
