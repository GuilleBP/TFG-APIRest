module.exports = {
    "id":{
        primary: true,
        type: 'uuid',
        required: true,
    },
    "username":{
        type: "string",
        unique: 'true',
        required: true,
    },
    "pass":{
        type: "string",
        required: true,
    },
    "email":{
        type: "string",
        unique: 'true',
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

    // belongs_to: {
    //     type: "relationship",
    //     target: "Proyect",
    //     relationship: "BELONGS_TO",
    //     direction: "out",
    //     // properties: {
    //     //     name: "string"
    //     // }
    // }
};