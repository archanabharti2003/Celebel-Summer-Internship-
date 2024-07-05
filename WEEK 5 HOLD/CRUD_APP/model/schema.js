const mongoose=require('mongoose');

const schema=mongoose.Schema;

const Itemschema=schema({
    name:{
        type:'string',
        required:'true'
    },
    age:{
        type:'number',
        required:'true'
    }
})

module.export=mongoose.model("schema",Itemschema);