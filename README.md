# In-house Leadboxes Example

This is a standalone laravel application which help blog publishers to increase their email list of readers. It has two facets. 

http://heppihealth.com/create_leadbox  - For publisher
http://heppihealth.com/iframe_test  - For readers

Here in the 1st link, publisher can generate pdf of their blog page. PDF is generated and stored in the system database. Also, It generates "LEADBOX CODE" for publisher's blog page which can be embedded to blog page code. 

Once Generated code is added to the publisher's blog page, It adds button to the blog page named "Get a free copy of Resource". If reader clicks on a button, it opens a modal which takes reader's email id and when reader submits, It will email pdf file of stored publisher's particular blog in the system database to reader's email id.

This application lessons the task of publisher to add complex code to every blog they write to get email ID of reader and also send them copy of blog pdf. 

# Built with 

PHP LARAVEL
PrintFriendly - https://www.printfriendly.com/api/ to generate pdf using cURL 

# Authors

Jaydeep Marvaniya

# License

This project is licensed under the MIT License
