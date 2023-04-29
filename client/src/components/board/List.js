import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import ListItem from "./ListItem";

import "./styles.css"

export default function List({ list, index }) {
    return (
      <Draggable draggableId={list.id} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div className="list-cards" {...provided.dragHandleProps}>
              <div className="title-list">
                <h2>{list.title}</h2>
              </div>
              <div className="container-cards">
                <Droppable droppableId={list.id} type="task">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="card-container"
                    >
                      {list.items.map((card, index) => (
                        <ListItem
                          key={card.id}
                          card={card}
                          index={index}
                          listId={list.id}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }