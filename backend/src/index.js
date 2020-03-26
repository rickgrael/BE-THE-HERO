const exress=require('express');
const cors=require('cors');
const app= exress();
const routes=require('./routes');

app.use(cors());
app.use(exress.json());
app.use(routes);

app.listen(3333,()=>{
    console.log('server running')
});