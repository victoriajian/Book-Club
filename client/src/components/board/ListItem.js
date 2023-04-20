import React, { useContext, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";
import { Draggable } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi"

import Container from "./Container";

import storeApi from "../../utils/storeApi";

import "./styles.scss"

export default function ListItem({ card, index, listId }) {
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(card.title);
    const { removeCard, updateCardTitle } = useContext(storeApi);
  
    const handleOnBlur = () => {
      updateCardTitle(newTitle, index, listId);
      setOpen(!open);
    };

    const image = "https://covers.openlibrary.org/b/isbn/" + card.isbn + "-M.jpg";

    const onSubmit = (event) => {
      event.preventDefault(event);
      console.log(event.target.name.value);
      console.log(event.target.email.value);
    };

    return (
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <div className="card-content">
              {open ? (
                <TextareaAutosize
                  type="text"
                  className="input-card-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={handleOnBlur}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleOnBlur();
                    }
                    return;
                  }}
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => setOpen(!open)}
                  className="card-title-container"
                >
                  <p>{card.title}</p>
                  <img src={image} alt="book cover"/>
                  <button
                    onClick={() => {
                      removeCard(index, listId);
                    }}
                  >
                    <BiTrash size={20}/>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  }