const data = {
    lists: {
        "to-read": {
            id: "to-read",
            title: "To Read",
            items: [
                {
                    id: "1",
                    title: "Pride and Prejudice",
                    image: "https://books.google.com/books/content?id=x6anSwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                {
                    id: "2",
                    title: "The Great Gatsby",
                    image: "https://books.google.com/books/content?id=gnQJEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
            ],
        },
        "reading": {
            id: "reading",
            title: "Reading",
            items: [
                {
                    id: "3",
                    title: "Diary of a Wimpy Kid",
                    image: "https://books.google.com/books/content?id=Ln4HejRlMXYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
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