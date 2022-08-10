module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "word":{
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
};