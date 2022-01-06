import * as fs from "fs";
import { AlignmentType,VerticalAlign, HorizontalPositionAlign, FrameAnchorType, HeadingLevel, Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun, ColumnBreak, convertInchesToTwip, SectionVerticalAlign, SectionType } from "docx";

async function index(req, res) {

    // let cuestionario = req.body
    // let listaPR = []
    // for (let { pregunta: p, respuesta: r, orden: o } of cuestionario) {
    //     let elementoPR = [{}]
    //     elementoPR.push({ orden: o })
    //     elementoPR.push({ pregunta: p.pregunta })
    //     if (p.fragmentos != null) {
    //         elementoPR.push({ fragmentos: this.p.fragmentos })
    //     }
    //     if (r.respuesta != null) {
    //         elementoPR.push({ respuesta: this.r.respuesta })
    //     }
    //     if (r.respuestas != null) {
    //         elementoPR.push({ respuestas: r.respuestas })
    //     }
    //     listaPR.push(elementoPR)
    // }


    // console.log(listaPR)





    const doc = new Document({

        // numbering: {
        //     config: [
        //         {
        //             reference: "my-crazy-numbering",
        //             levels: [

        //                 {
        //                     level: 0,
        //                     format: "decimal",
        //                     text: "%1",
        //                     alignment: AlignmentType.START,
        //                     style: {
        //                         paragraph: {
        //                             indent: { left: 720, hanging: 260 },
        //                         },
        //                     },
        //                 },
        //             ],
        //         },
        //         {
        //             reference: "my-crazy-numbering2",
        //             levels: [

        //                 {
        //                     level: 0,
        //                     format: "decimal",
        //                     text: "%1",
        //                     alignment: AlignmentType.LEFT,
        //                     style: {
        //                         paragraph: {
        //                             indent: { left: 3600, hanging: convertInchesToTwip(0.25) },
        //                         },
        //                     },
        //                 },
        //             ],
        //         },
        //     ]
        // },
        sections: [
            {

                children: [

                    new Paragraph({
                        text: "1. ¿Conoce Ud. de las acciones que está efectuando la dirección del Partido en la provincia para el enfrentamiento a las ilegalidades y las indisciplinas sociales?",
                        spacing: {
                            after: 200,
                        },

                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "( ) Si",
                                numbering: {
                                    reference: "my-crazy-numbering",
                                    level: 0,
                                },
                            }),
                            new TextRun({
                                text: "( ) No",
                                numbering: {
                                    reference: "my-crazy-numbering",
                                    level: 0,
                                },
                            }),
                            new TextRun({
                                text: "( ) No sé",
                                numbering: {
                                    reference: "my-crazy-numbering",
                                    level: 0,
                                },
                            }),
                        ],
                        spacing: {
                            after: 200,
                        },
                    }),
                    new Paragraph({
                        text: "2. Los debates públicos que se realizan los fines de semanas son:",
                        spacing: {
                            after: 200,
                        },

                    }),
                    new Paragraph({
                        text: "(  ) Muy importantes y generan beneficios",
                        numbering: {
                            reference: "my-crazy-numbering",
                            level: 0,
                        },
                    }),
                    new Paragraph({
                        text: "(  ) Contribuyen al reforzamiento de los valores",
                        numbering: {
                            reference: "my-crazy-numbering",
                            level: 0,
                        },
                    }),
                    new Paragraph({
                        text: "(  ) Se están haciendo inútilmente",
                        numbering: {
                            reference: "my-crazy-numbering",
                            level: 0,
                        },
                    }),
                    new Paragraph({
                        text: "(  ) No sé, tengo dudas",
                        numbering: {
                            reference: "my-crazy-numbering",
                            level: 0,
                        },
                    }),


                    new Paragraph({
                        text: "Según su apreciación, con las medidas que se están tomando para combatir las ilegalidades y las indisciplinas, este fenómeno: (Marque con una equis (X) una sola respuesta en cada caso).", spacing: {
                            before: 200,
                        },
                    }),



                ]
            },
        ],

    });
    let ContenidoDelDocumento = req.body

    const nuevoDoc = creaDoc(ContenidoDelDocumento)
    
    
    const auxDoc = addPcRC(nuevoDoc)

    const auxDoc1 = addTabla(auxDoc, null, null)
    const auxDoc2 = annPDF(auxDoc1)


    Packer.toBuffer(auxDoc2).then((buffer) => {
        let filename = req.body.titulo + ".docx";
        console.log(__dirname)
        fs.writeFileSync(`${__dirname}/../public/${filename}`, buffer);
        // res.writeHead(200, {
        //   "Content-Type":
        //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        //   "Content-disposition": "attachment;filename=" + filename,
        //   //"Content-Length": buffer.length,
        // });
        // res.end(buffer);
        res.json({ ruta: `${filename}` })
    });

    // annPDF(p,null,doc)
    // res.send("Documento Creado")

}

function creaDoc(contDoc) {
    console.log(contDoc)

    try {
        const doc = new Document({
            numbering: {
                config: [
                    {
                        reference: "my-crazy-numbering",
                        levels: [

                            {
                                level: 0,
                                format: "decimal",
                                text: "%1",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: 720, hanging: 260 },
                                    },
                                },
                            },
                        ],
                    },
                    {
                        reference: "my-crazy-numbering2",
                        levels: [

                            {
                                level: 0,
                                format: "decimal",
                                text: "%1",
                                alignment: AlignmentType.LEFT,
                                style: {
                                    paragraph: {
                                        indent: { left: 3600, hanging: convertInchesToTwip(0.25) },
                                    },
                                },
                            },
                        ],
                    },
                ]
            },
            sections: [
                {
                    children: [
                        new Paragraph({
                            text: contDoc.titulo,
                            heading: HeadingLevel.TITLE,
                        }),]
                }
            ]
        })

        return doc
    } catch (err) {
        console.log(err)
    }

}

function destroy(req, res) {

    let recurso = req.params.recurso
    fs.unlinkSync(`${__dirname}/../public/${recurso}`)
    res.status(200)


}

function addPcRC(doc, config, contenido) {

    doc.addSection({
        properties: {
            type: SectionType.CONTINUOUS,
        },
        children: [
            new Paragraph({
                text: "1. ¿Conoce Ud. de las acciones que está efectuando la dirección del Partido en la provincia para el enfrentamiento a las ilegalidades y las indisciplinas sociales?",
                spacing: {
                    after: 200,
                },

            }),
            new Paragraph({

                children: [
                    new TextRun({
                        text: "( ) Si",
                        spacing: {
                            after: 200,
                        },
                    }),
                    new TextRun({
                        text: "( ) No",
                        spacing: {
                            after: 200,
                        },
                    }),
                    new TextRun({
                        text: "( ) No sé",
                        spacing: {
                            after: 200,
                        },
                    }),
                ],
                spacing: {
                    after: 200,
                },
                verticalAlign: VerticalAlign.CENTER,
            }),
            new Paragraph({
                text: "2. Los debates públicos que se realizan los fines de semanas son:",
                spacing: {
                    after: 200,
                },

            }),
            new Paragraph({
                text: "(  ) Muy importantes y generan beneficios",
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                text: "(  ) Contribuyen al reforzamiento de los valores",
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                text: "(  ) Se están haciendo inútilmente",
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                text: "(  ) No sé, tengo dudas",
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),


            new Paragraph({
                text: "Según su apreciación, con las medidas que se están tomando para combatir las ilegalidades y las indisciplinas, este fenómeno: (Marque con una equis (X) una sola respuesta en cada caso).", spacing: {
                    before: 200,
                },
            }),



        ],
    });
    return doc
}


function addTabla(doc, config, contenido) {
    const table = new Table({
        columnWidths: [3505, 5505],
        alignment: AlignmentType.CENTER,
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            text: "\t3. Actualmente",
                            bold: true,
                        })],
                        columnSpan: 2,
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            text: "\t4. Posteriormente",
                            bold: true,
                        })],
                        columnSpan: 2,
                    }),
                ],

            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("1.(   )")],
                    }),
                    new TableCell({

                        children: [new Paragraph({
                            text: "Aumenta",
                            bold: true,
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph("1.(   )")],
                    }),
                    new TableCell({

                        children: [new Paragraph({
                            text: "Aumentará",
                            bold: true,
                        })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("2.(   )")],
                    }),
                    new TableCell({

                        children: [new Paragraph({
                            text: "Se mantiene igual",
                            bold: true,
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph("2.(   )")],
                    }),
                    new TableCell({

                        children: [new Paragraph({
                            text: "Se mantendrá igual",
                            bold: true,
                        })],
                    }),
                ],
            }), new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("3.(   )")],
                    }),
                    new TableCell({

                        children: [new Paragraph({
                            text: "Ha disminuido",
                            bold: true,
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph("3.(   )")],
                    }),
                    new TableCell({

                        children: [new Paragraph({
                            text: "Disminuirá",
                            bold: true,
                        })],
                    }),
                ],
            }), new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("4.(   )")],
                    }),
                    new TableCell({

                        children: [new Paragraph({
                            text: "No sé, tengo dudas",
                            bold: true,
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph("4.(   )")],
                    }),
                    new TableCell({

                        children: [new Paragraph({
                            text: "No sé, tengo dudas",
                            bold: true,
                        })],
                    }),
                ],
            }),
        ],
    });
    doc.addSection({
        properties: {
            type: SectionType.CONTINUOUS,
        },
        children: [

            table
        ],
    });
    return doc
}

function annPDF(doc) {

    console.log("Esperate que entro aqui")
    //doc.headers = "Titulo"
    //console.log(doc)
    doc.addSection({
        properties: {
            type: SectionType.CONTINUOUS,
        },
        children: [
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




            new Paragraph({
                text: "5. Complete con lo que viene a su mente, al leer la frase: LAS INDISCIPLINAS SOCIALES Y LAS  ILEGALIDADES EN HOLGUÍN",
                spacing: {
                    after: 200,
                },

            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "( ) Si",
                        numbering: {
                            reference: "my-crazy-numbering",
                            level: 0,
                        },
                    }),
                    new TextRun({
                        text: "( ) No",
                        numbering: {
                            reference: "my-crazy-numbering",
                            level: 0,
                        },
                    }),
                    new TextRun({
                        text: "( ) No sé",
                        numbering: {
                            reference: "my-crazy-numbering",
                            level: 0,
                            spacing: 50
                        },
                    }),
                ],
            }),



        ],
    });


    return doc

}

module.exports = {
    index,
    destroy

}