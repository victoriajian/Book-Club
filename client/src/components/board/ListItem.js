import React, { useContext, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";
import { Draggable } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi"

import storeApi from "../../utils/storeApi";

import "./styles.css"

const Book = ({ book }) => {
  const title = book.title ? book.title.substr(0, 53) : '';
  const image = book.image ? book.image : 'https://via.placeholder.com/128x196?text=No+Image';

  return (
      <div>
          <img src={image} alt={`Cover of ${title}`} />
          <h3>{title}</h3>
          {/* <p><b>by {author}</b></p>
          <p>{description}</p> */}
      </div>
  );
};

export default function ListItem({ card, index, listId }) {
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(card.title);
    const { removeCard, updateCardTitle } = useContext(storeApi);
  
    const handleOnBlur = () => {
      updateCardTitle(newTitle, index, listId);
      setOpen(!open);
    };

    // const image = "https://covers.openlibrary.org/b/isbn/" + card.isbn + "-M.jpg";

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
                  // onClick={() => setOpen(!open)}
                  className="card-title-container"
                >
                  <p>{card.title}</p>
                  <img src={card.image} alt="book cover"/>
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