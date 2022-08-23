module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "text":{
        type: "string",
        required: true,
    },
    "created_at":{
        type: "localdatetime",
        default: () => new Date()
    },
    "updated_at":{
        type: "localdatetime",
        default: () => new Date()
    },
    got: {
        type: "relationship",
        target: "Keyword",
        relationship: "GOT",
        direction: "out",
        eager: true
    }
};