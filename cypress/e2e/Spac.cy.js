/// <reference types= "cypress" />

describe('Api Testing', () => {
    const bookNames=[
        "The carenter day",
        "To kill",
        "The Great",
        "pride And predjic",
        "The Hobbit",
        "Moby-dick",
        "The Odyssey",
    ];
    const fullNames=[
        "Joun Smith",
        "Alice Jhonson",
        "Michail Brown",
        "Emily Dives",
        "David Lee",
        "Sophea Welson",
        "Olivea Martinaze",
        "James Taylor",
        "Lee Hirnands",
    ];

    let RandomBookName =Math.floor(Math.random()*bookNames.length);
    let RandomfullName =Math.floor(Math.random()*fullNames.length);
    let Randomisbn =Math.floor(Math.random()*5478933);
    let Randomaisle =Math.floor(Math.random()*5478933);
    it('Test post Request', () => {
        let BaseUrl= "https://rahulshettyacademy.com/Library/Addbook.php"
        let RequestBody =
        {
            name:bookNames[RandomBookName],
            isbn: Randomisbn ,
            aisle:Randomaisle,
            author:fullNames[RandomfullName]
            }



        cy.request({
        method:"POST",
        url:BaseUrl,
        body:RequestBody
        }).then((Responce)=>{
          cy.log(Responce.body)
          expect(Responce.status).to.eq(200)
          expect(Responce.body.Msg).to.eq("successfully added")
        })
    });
    it('Test Get', () => {
        cy.request({
         method:"GET"   ,
         url:`https://rahulshettyacademy.com/Library/GetBook.php?ID=${Randomisbn}${Randomaisle}`
          
        }).then((Responce)=>{
            cy.log(Responce.body[0].book_name)
            expect(Responce.status).to.eq(200)
            expect(Responce.body[0].book_name).to.eq(bookNames[RandomBookName])
        })
    });
    it('Test Delete Api', () => {
        let RequestBody =
        {
         ID:`${Randomisbn}${Randomaisle}`
            }

        cy.request({
            method:"DELETE",
            url:"https://rahulshettyacademy.com/Library/DeleteBook.php",
            body:RequestBody
        }).then((Responce)=>{
            cy.log(Responce)
            expect(Responce.status).to.eq(200)
            expect(Responce.body.msg).to.eq("book is successfully deleted")
        })
    });

    it('Test Get for non exist book', () => {
        cy.request({
         method:"GET"   ,
        
         url:`https://rahulshettyacademy.com/Library/GetBook.php?ID=${Randomisbn}${Randomaisle}`,
         failOnStatusCode: false,
         
        }).then((Responce)=>{
            cy.log(Responce.body.msg)
            expect(Responce.status).to.eq(404)
            expect(Responce.body.msg).to.eq("The book by requested bookid / author name does not exists!")
        })
    });
    
});