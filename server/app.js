const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const pdfkit = require('pdfkit')
const InstitutionRouter = require('./routes/InstitutionRouter')
const AdminRouter = require('./routes/AdminRouter')
const TemplateRouter = require('./routes/TemplateRouter')
// const db = require('./db')

let dbConnectCounter = 0;

function dbConnect(){
  // db connect
  mongoose.connect(/*`mongodb+srv://sourav:${process.env.MONGO_ATLAS_KEY}@fin-db.cmksi.mongodb.net/id-gen?retryWrites=true&w=majority`*/'mongodb://localhost:5000/id-gen',{
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  },(err)=>{
    if(!err)
      console.log("db connection established");
    else if(dbConnectCounter<process.env.DB_RETRIES_MAX){
      dbConnectCounter++;
      console.log(`retry ${dbConnectCounter}`);
      dbConnect();
    }
    else{
      throw new Error("db connection failed");
    }
  });
};

dbConnect();


// Middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors())
// set response header and cors
// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Header",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
//   if(req.method=="OPTIONS"){
//     res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH");
//     return res.status(200).json({});
//   }
// });

// static
app.use(express.static('./public'));

app.use('/institution',InstitutionRouter);
app.use('/admin',AdminRouter);
app.use('/template',TemplateRouter);

// 
// app.get('/generate/:template/:class',(req,res,next)=>{
//   const doc = new pdfkit({
//     size:'A3',
//     margin:0
//   });
//   doc.font('Roboto-Medium.ttf')
//   doc.pipe(res);
//   // validate params
//   let temp=template[0];
//   let classname = req.params.class!=undefined?req.params.class:"XI";
//   if(req.params.template){
//     for(t in template){
//       if(t.template_name==req.params.template){
//         temp = t;
//         break;
//       }
//     }
//   }
//   const max = Math.floor(doc.page.width/temp.cardwidth);
//   let cardno=0;
//   student.forEach((s)=>{
//     if(classname==s.class){
//       let r = cardno%max;
//       let c = Math.floor(cardno/max)
//       let cardposx = (r+1)*temp.cardx+temp.cardwidth*r;
//       let cardposy = temp.cardy*(2*c+1)+2*c*temp.cardheight
//       let backcardposy = (temp.cardy+temp.cardheight)*(2*c+1)+temp.cardy;
//       // row lines
//       if(cardno<max)
//       {
//         // line props
//         doc.fillAndStroke("#777").lineWidth(temp.line.rowwidth).undash()
//         // begin line
//         doc.moveTo(cardposx-temp.line.rowpadding,0).lineTo(cardposx-temp.line.rowpadding,doc.page.height).stroke()
//         // end line
//         doc.moveTo(cardposx+temp.cardwidth+temp.line.rowpadding,0)
//         .lineTo(cardposx+temp.cardwidth+temp.line.rowpadding,doc.page.height)
//         .stroke()
//       }
//       // front
//       let frontbuffer = new Buffer.from(temp.img.front,'base64')
//       let backbuffer = new Buffer.from(temp.img.back,'base64')
//       let photobuffer = new Buffer.from(s.img.src,'base64')
//       doc.image(frontbuffer, {
//         x: cardposx,
//         y: cardposy,
//         width: temp.cardwidth
//       })
//       doc.image(photobuffer, {
//         x: cardposx+temp.photo.x,
//         y: cardposy+temp.photo.y,
//         width: temp.photo.width
//       })
//       let front="";
//       for(const e in s){
//         if(temp.front.fields.includes(e))
//         front+=`${e.toUpperCase()} : ${s[e].toUpperCase()}\n`;
//       }
//       doc.fontSize(temp.front.fontsize);
//       doc.fillAndStroke("white")
//       doc.text(front,cardposx+temp.front.textx,cardposy+temp.front.texty,{
//         width:temp.front.textwidth,
//         lineGap:temp.front.linegap
//       })
//       //lines
//       // line props
//       doc.fillAndStroke("#777").lineWidth(temp.line.colwidth).dash(temp.line.coldash,{space:temp.line.colspace})
//       // begin line
//       doc.moveTo(0,cardposy-temp.line.colpadding).lineTo(doc.page.width,cardposy-temp.line.colpadding).stroke()
//       // end line
//       doc.moveTo(0,cardposy+temp.cardheight+temp.line.colpadding).lineTo(doc.page.width,cardposy+temp.cardheight+temp.line.colpadding).stroke()
//       // back
//       doc.image(backbuffer, {
//         x: cardposx,
//         y: backcardposy,
//         width: temp.cardwidth
//       })
//       let back="";
//       for(const e in s){
//         if(temp.back.fields.includes(e))
//         back+=`${e.toUpperCase()} : ${s[e].toUpperCase()}\n`;
//       }
//       doc.fillAndStroke("white").text(back,cardposx+temp.back.textx,backcardposy+temp.back.texty,{
//         width:temp.back.textwidth,
//         lineGap:temp.back.linegap
//       })
//       //lines
//       // line props
//       doc.fillAndStroke("#777").lineWidth(temp.line.colwidth).dash(temp.line.coldash,{space:temp.line.colspace})
//       // begin
//       doc.moveTo(0,backcardposy-temp.line.colpadding).lineTo(doc.page.width,backcardposy-temp.line.colpadding).stroke()
//       // end
//       doc.moveTo(0,backcardposy+temp.cardheight+temp.line.colpadding).lineTo(doc.page.width,backcardposy+temp.cardheight+temp.line.colpadding).stroke()
//       cardno++;
//     }
//   })
//   doc.end()
  


// })




// 404 route
app.use((req,res,next)=>{
  const error = new Error("Not a valid request");
  error.status = 404;
  next(error);
});

// Error handler
app.use((err,req,res,next)=>{
  res.status(err.status || 500).json({"Error":err.message});
})

module.exports = app;