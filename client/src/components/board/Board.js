import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./List";

import store from "../../utils/store";
import StoreApi from "../../utils/storeApi";

import "./styles.scss";

const dataStorage = JSON.parse(window.localStorage.getItem("dataKanban"));

const initialState = () => {
    if (dataStorage) {
        return dataStorage;
    } else {
        window.localStorage.setItem("dataKanban", JSON.stringify(store));
        return store;
    }
};

export default function Board() {
    const [data, setData] = useState(initialState);

    const addMoreCard = (title, listId) => {
        if (!title) {
            return;
        }

        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            title,
        };

        const list = data.lists[listId];
        list.items = [...list.items, newCard];

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
        window.localStorage.setItem("dataKanban", JSON.stringify(newState));
    };

    const removeCard = (index, listId) => {
        const list = data.lists[listId];

        list.items.splice(index, 1);

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
        window.localStorage.setItem("dataKanban", JSON.stringify(newState));
    };

    const updateCardTitle = (title, index, listId) => {
        const list = data.lists[listId];
        list.items[index].title = title;

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
        window.localStorage.setItem("dataKanban", JSON.stringify(newState));
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (type === "list") {
            const newListIds = data.listIds;

            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId);

            const newState = {
                ...data,
                listIds: newListIds,
            };
            setData(newState);
            window.localStorage.setItem("dataKanban", JSON.stringify(newState));

            return;
        }

        const sourceList = data.lists[source.droppableId];
        const destinationList = data.lists[destination.droppableId];
        const draggingCard = sourceList.items.filter(
            (card) => card.id === draggableId
        )[0];

        if (source.droppableId === destination.droppableId) {
            sourceList.items.splice(source.index, 1);
            destinationList.items.splice(destination.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList,
                },
            };
            setData(newState);
            window.localStorage.setItem("dataKanban", JSON.stringify(newState));
        } else {
            sourceList.items.splice(source.index, 1);
            destinationList.items.splice(destination.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList,
                },
            };

            setData(newState);
            window.localStorage.setItem("dataKanban", JSON.stringify(newState));
        }
    };

    return (
        <StoreApi.Provider
            value={{
                addMoreCard,
                removeCard,
                updateCardTitle
            }}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="app" type="list" direction="horizontal">
                    {(provided) => (
                        <div
                            className="wrapper"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {data.listIds.map((listId, index) => {
                                const list = data.lists[listId];

                                return <List list={list} key={listId} index={index} />;
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </StoreApi.Provider>
    );
}