const data = {
    lists: {
        "to-read": {
            id: "to-read",
            title: "To Read",
            items: [
                {
                    id: "1",
                    isbn: "9780708982280",
                    title: "Pride and Prejudice",
                },
                {
                    id: "2",
                    isbn: "9780684801520",
                    title: "The Great Gatsby",
                },
            ],
        },
        "reading": {
            id: "reading",
            title: "Reading",
            items: [
                {
                    id: "3",
                    isbn: "9781439582633",
                    title: "Diary of a Wimpy Kid",
                },
            ],
        },
        "completed": {
            id: "completed",
            title: "Completed",
            items: [],
        },
    },
    listIds: ["to-read", "reading", "completed"],
};

export default data;