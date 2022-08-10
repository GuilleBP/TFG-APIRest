module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "name":{
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