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

    belongs_to: {
        type: "relationship",
        target: "Proyect",
        relationship: "BELONGS_TO",
        direction: "out",
        // properties: {
        //     name: "string"
        // }
    }
};