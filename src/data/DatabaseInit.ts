import { Batches, PrismaClient, ITeacher } from '@prisma/client';
const prisma = new PrismaClient()

// section
// await prisma.degree.createMany({
//     data: [{id: "BE"},{id: "ME"}]
// })

// await prisma.branch.createMany({
//     data: [{id:"BCC" ,name: "Cloud Computing"},{id:'BIS',name: "Information Security"},{'id': "BCT",name: "Blockchain"},{id: 'BIT',name: "Internet Of Things"},{id: 'BDA',name: "Big Data Analytics",},{'id': "AML",name: "Artificial Intelligence and Machine Learning"},{'id': "BCG",name: "Gaming & Graphics"},{'id':"CBS",name:"Computer Science and Business System"},{id: "BCD",name: "Development and Operation Collaboration"},{id:"AIT_KRG",name: "Kargil"},{id: 'MCC',name: "Masters Cloud Computing"}]
// })
// const batches = [{"id":"22BCC","branch":"BCC","semester":"4","BEME":"BE"},{"id":"21BCC","branch":"BCC","semester":"6","BEME":"BE"},{"id":"20BCC","branch":"BCC","semester":"8","BEME":"BE"},{"id":"22BIS","branch":"BIS","semester":"4","BEME":"BE"},{"id":"21BIS","branch":"BIS","semester":"6","BEME":"BE"},{"id":"20BIS","branch":"BIS","semester":"8","BEME":"BE"},{"id":"21BCT","branch":"BCT","semester":"6","BEME":"BE"},{"id":"22BCT","branch":"BCT","semester":"4","BEME":"BE"},{"id":"22BIT","branch":"BIT","semester":"4","BEME":"BE"},{"id":"21BIT","branch":"BIT","semester":"6","BEME":"BE"},{"id":"20BIT","branch":"BIT","semester":"8","BEME":"BE"},{"id":"22BDA","branch":"BDA","semester":"4","BEME":"BE"},{"id":"21BDA","branch":"BDA","semester":"6","BEME":"BE"},{"id":"20BDA","branch":"BDA","semester":"8","BEME":"BE"},{"id":"21AML","branch":"AML","semester":"6","BEME":"BE"},{"id":"20AML","branch":"AML","semester":"8","BEME":"BE"},{"id":"21AIT_KRG","branch":"AIT_KRG","semester":"6","BEME":"BE"},{"id":"22AML","branch":"AML","semester":"4","BEME":"BE"},{"id":"22AIT_KRG","branch":"AIT_KRG","semester":"4","BEME":"BE"},{"id":"22BCG","branch":"BCG","semester":"4","BEME":"BE"},{"id":"21BCG","branch":"BCG","semester":"6","BEME":"BE"},{"id":"20BCG","branch":"BCG","semester":"8","BEME":"BE"},{"id":"22CBS","branch":"CBS","semester":"4","BEME":"BE"},{"id":"21CBS","branch":"CBS","semester":"6","BEME":"BE"},{"id":"20CBS","branch":"CBS","semester":"8","BEME":"BE"},{"id":"22BCD","branch":"BCD","semester":"4","BEME":"BE"},{"id":"21BCD","branch":"BCD","semester":"6","BEME":"BE"},{"id":"23MCC","branch":"MCC","semester":"2","BEME":"ME"}];
// await prisma.batches.createMany({
//     data: batches
// })
// await prisma.section.createMany({
//     data: [{"group":"B","capacity":35,"id":"20AML-1/B","batch":"20AML"},{"group":"A","capacity":35,"id":"20AML-1/A","batch":"20AML"},{"group":"A","capacity":35,"id":"20AML-2/A","batch":"20AML"},{"group":"B","capacity":35,"id":"20AML-2/B","batch":"20AML"},{"group":"A","capacity":33,"id":"20AML-3/A","batch":"20AML"},{"group":"B","capacity":34,"id":"20AML-3/B","batch":"20AML"},{"group":"B","capacity":35,"id":"20AML-4/B","batch":"20AML"},{"group":"A","capacity":35,"id":"20AML-4/A","batch":"20AML"},{"group":"A","capacity":32,"id":"20AML-5/A","batch":"20AML"},{"group":"B","capacity":26,"id":"20AML-5/B","batch":"20AML"},{"group":"B","capacity":32,"id":"20AML-6/B","batch":"20AML"},{"group":"A","capacity":30,"id":"20AML-6/A","batch":"20AML"},{"group":"A","capacity":35,"id":"20BCC-1/A","batch":"20BCC"},{"group":"B","capacity":34,"id":"20BCC-1/B","batch":"20BCC"},{"group":"A","capacity":35,"id":"20BCC-2/A","batch":"20BCC"},{"group":"B","capacity":35,"id":"20BCC-2/B","batch":"20BCC"},{"group":"A","capacity":37,"id":"20BCG-1/A","batch":"20BCG"},{"group":"B","capacity":36,"id":"20BCG-1/B","batch":"20BCG"},{"group":"A","capacity":34,"id":"20BDA-1/A","batch":"20BDA"},{"group":"B","capacity":31,"id":"20BDA-1/B","batch":"20BDA"},{"group":"A","capacity":34,"id":"20BDA-2/A","batch":"20BDA"},{"group":"B","capacity":32,"id":"20BDA-2/B","batch":"20BDA"},{"group":"A","capacity":32,"id":"20BDA-3/A","batch":"20BDA"},{"group":"B","capacity":32,"id":"20BDA-3/B","batch":"20BDA"},{"group":"A","capacity":26,"id":"20BDA-4/A","batch":"20BDA"},{"group":"B","capacity":27,"id":"20BDA-4/B","batch":"20BDA"},{"group":"A","capacity":34,"id":"20BIS-1/A","batch":"20BIS"},{"group":"B","capacity":32,"id":"20BIS-1/B","batch":"20BIS"},{"group":"A","capacity":26,"id":"20BIS-2/A","batch":"20BIS"},{"group":"B","capacity":28,"id":"20BIS-2/B","batch":"20BIS"},{"group":"A","capacity":39,"id":"20BIT-1/A","batch":"20BIT"},{"group":"B","capacity":36,"id":"20BIT-1/B","batch":"20BIT"},{"group":"A","capacity":25,"id":"20CBS-1/A","batch":"20CBS"},{"group":"B","capacity":25,"id":"20CBS-1/B","batch":"20CBS"},{"group":"A","capacity":32,"id":"21AIT_KRG-1/A","batch":"21AIT_KRG"},{"group":"B","capacity":37,"id":"21AIT_KRG-1/B","batch":"21AIT_KRG"},{"group":"A","capacity":35,"id":"21AML-1/A","batch":"21AML"},{"group":"B","capacity":35,"id":"21AML-1/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-10/A","batch":"21AML"},{"group":"B","capacity":38,"id":"21AML-10/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-11/A","batch":"21AML"},{"group":"B","capacity":35,"id":"21AML-11/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-12/A","batch":"21AML"},{"group":"B","capacity":35,"id":"21AML-12/B","batch":"21AML"},{"group":"B","capacity":37,"id":"21AML-2/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-2/A","batch":"21AML"},{"group":"B","capacity":35,"id":"21AML-3/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-3/A","batch":"21AML"},{"group":"B","capacity":35,"id":"21AML-4/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-4/A","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-5/A","batch":"21AML"},{"group":"B","capacity":35,"id":"21AML-5/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-6/A","batch":"21AML"},{"group":"B","capacity":35,"id":"21AML-6/B","batch":"21AML"},{"group":"B","capacity":34,"id":"21AML-7/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-7/A","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-8/A","batch":"21AML"},{"group":"B","capacity":35,"id":"21AML-8/B","batch":"21AML"},{"group":"A","capacity":35,"id":"21AML-9/A","batch":"21AML"},{"group":"B","capacity":38,"id":"21AML-9/B","batch":"21AML"},{"group":"A","capacity":26,"id":"21BCC-1/A","batch":"21BCC"},{"group":"B","capacity":24,"id":"21BCC-1/B","batch":"21BCC"},{"group":"A","capacity":26,"id":"21BCC-2/A","batch":"21BCC"},{"group":"B","capacity":28,"id":"21BCC-2/B","batch":"21BCC"},{"group":"A","capacity":38,"id":"21BCD-1/A","batch":"21BCD"},{"group":"A","capacity":35,"id":"21BCG-1/A","batch":"21BCG"},{"group":"B","capacity":39,"id":"21BCG-1/B","batch":"21BCG"},{"group":"A","capacity":32,"id":"21BCT-1/A","batch":"21BCT"},{"group":"B","capacity":32,"id":"21BCT-1/B","batch":"21BCT"},{"group":"A","capacity":39,"id":"21BDA-1/A","batch":"21BDA"},{"group":"B","capacity":39,"id":"21BDA-1/B","batch":"21BDA"},{"group":"A","capacity":38,"id":"21BDA-2/A","batch":"21BDA"},{"group":"B","capacity":28,"id":"21BDA-2/B","batch":"21BDA"},{"group":"A","capacity":35,"id":"21BIS-1/A","batch":"21BIS"},{"group":"B","capacity":34,"id":"21BIS-1/B","batch":"21BIS"},{"group":"A","capacity":22,"id":"21BIS-2/A","batch":"21BIS"},{"group":"B","capacity":22,"id":"21BIS-2/B","batch":"21BIS"},{"group":"A","capacity":32,"id":"21BIT-1/A","batch":"21BIT"},{"group":"B","capacity":36,"id":"21BIT-1/B","batch":"21BIT"},{"group":"A","capacity":23,"id":"21CBS-1/A","batch":"21CBS"},{"group":"B","capacity":24,"id":"21CBS-1/B","batch":"21CBS"},{"group":"B","capacity":19,"id":"22AIT_KRG-1/B","batch":"22AIT_KRG"},{"group":"A","capacity":32,"id":"22AIT_KRG-1/A","batch":"22AIT_KRG"},{"group":"A","capacity":38,"id":"22AML-1/A","batch":"22AML"},{"group":"B","capacity":38,"id":"22AML-1/B","batch":"22AML"},{"group":"A","capacity":35,"id":"22AML-10/A","batch":"22AML"},{"group":"B","capacity":35,"id":"22AML-10/B","batch":"22AML"},{"group":"B","capacity":32,"id":"22AML-11/B","batch":"22AML"},{"group":"A","capacity":35,"id":"22AML-11/A","batch":"22AML"},{"group":"A","capacity":39,"id":"22AML-2/A","batch":"22AML"},{"group":"B","capacity":39,"id":"22AML-2/B","batch":"22AML"},{"group":"B","capacity":38,"id":"22AML-3/B","batch":"22AML"},{"group":"A","capacity":39,"id":"22AML-3/A","batch":"22AML"},{"group":"A","capacity":39,"id":"22AML-4/A","batch":"22AML"},{"group":"B","capacity":40,"id":"22AML-4/B","batch":"22AML"},{"group":"A","capacity":38,"id":"22AML-5/A","batch":"22AML"},{"group":"B","capacity":39,"id":"22AML-5/B","batch":"22AML"},{"group":"A","capacity":38,"id":"22AML-6/A","batch":"22AML"},{"group":"B","capacity":38,"id":"22AML-6/B","batch":"22AML"},{"group":"A","capacity":35,"id":"22AML-7/A","batch":"22AML"},{"group":"B","capacity":34,"id":"22AML-7/B","batch":"22AML"},{"group":"B","capacity":35,"id":"22AML-8/B","batch":"22AML"},{"group":"A","capacity":35,"id":"22AML-8/A","batch":"22AML"},{"group":"B","capacity":35,"id":"22AML-9/B","batch":"22AML"},{"group":"A","capacity":35,"id":"22AML-9/A","batch":"22AML"},{"group":"B","capacity":32,"id":"22BCC-1/B","batch":"22BCC"},{"group":"A","capacity":38,"id":"22BCC-1/A","batch":"22BCC"},{"group":"A","capacity":35,"id":"22BCC-2/A","batch":"22BCC"},{"group":"A","capacity":24,"id":"22BCD-1/A","batch":"22BCD"},{"group":"B","capacity":23,"id":"22BCD-1/B","batch":"22BCD"},{"group":"A","capacity":22,"id":"22BCG-1/A","batch":"22BCG"},{"group":"B","capacity":28,"id":"22BCG-1/B","batch":"22BCG"},{"group":"A","capacity":37,"id":"22BCT-1/A","batch":"22BCT"},{"group":"B","capacity":37,"id":"22BCT-1/B","batch":"22BCT"},{"group":"A","capacity":36,"id":"22BDA-1/A","batch":"22BDA"},{"group":"B","capacity":36,"id":"22BDA-1/B","batch":"22BDA"},{"group":"A","capacity":40,"id":"22BDA-2/A","batch":"22BDA"},{"group":"B","capacity":38,"id":"22BDA-2/B","batch":"22BDA"},{"group":"A","capacity":26,"id":"22BIS-1/A","batch":"22BIS"},{"group":"B","capacity":28,"id":"22BIS-1/B","batch":"22BIS"},{"group":"A","capacity":23,"id":"22BIS-2/A","batch":"22BIS"},{"group":"B","capacity":33,"id":"22BIS-2/B","batch":"22BIS"},{"group":"A","capacity":21,"id":"22BIT-1/A","batch":"22BIT"},{"group":"B","capacity":23,"id":"22BIT-1/B","batch":"22BIT"},{"group":"A","capacity":27,"id":"22CBS-1/A","batch":"22CBS"},{"group":"A","capacity":9,"id":"23MCC-1/A","batch":"23MCC"}]
// }
// )

// await prisma.course.createMany({
//     data: [{"Cname":"Agile Development Methodologies","code":"21CSH-383"},{"Cname":"Artificial Intelligence and Natural Language Processing Lab","code":"20CSP-491"},{"Cname":"Cloud Security Lab","code":"20CSA-487"},{"Cname":"Identity & Access Management","code":"21CSH-394"},{"Cname":"Big Data Security lab","code":"20CSP-484"},{"Cname":"Microprocessor and Microcontroller","code":"22CSH-295"},{"Cname":"Cloud Computing & IoT Lab","code":"21CSP-387"},{"Cname":"Blockchain lab","code":"20CSD-497"},{"Cname":"Designing of IoT Applications Lab","code":"20CSP-499"},{"Cname":"BIG DATA TECHNOLOGIES (SPARK AND SCALA)","code":"21CSH-381"},{"Cname":"BIG DATA ARCHITECTURE AND CORE TECHNOLOGIES","code":"21CSH-385"},{"Cname":"HCI Lab","code":"20CSP-488"},{"Cname":"AR Lab","code":"20CSF-494"},{"Cname":"Machine learning Lab","code":"22CSH-286"},{"Cname":"NLP Lab","code":"21CSH-399"},{"Cname":"Technical Traning","code":"21CSP-382"},{"Cname":"DAA","code":"22CSH282"},{"Cname":"Design and Analysis of Algorithm","code":"22CSH-283"},{"Cname":"Python Programming","code":"22CSH-287"},{"Cname":"NOS","code":"21-CSH-397"},{"Cname":"DIP Lab","code":"20CSP-483"},{"Cname":"Design and Analysis of Algorithms Lab","code":"22CSH-282"},{"Cname":"Natural Language Processing Lab","code":"21CSH-392"},{"Cname":"Digital Image Processing Lab","code":"20CSP458"},{"Cname":"Augmented Reality Lab","code":"20CSP455"},{"Cname":"Artificial Intelligence Lab","code":"21CSH-398"},{"Cname":"Network Operating System Lab","code":"21CSH-397"},{"Cname":"AI LAB","code":"21CSH - 398"},{"Cname":"XML Programming","code":"22CSH-291"},{"Cname":"Augmented Virtual & Mixed Reality","code":"21CSH-386"},{"Cname":"Web programming for Graphics & Gaming (HTML 5 and Web GL)","code":"21CSH-387"},{"Cname":"Gaming and Simulation Lab","code":"20CSP-493"},{"Cname":"Advanced Computer Programming Lab","code":"20CSG-490"},{"Cname":"Operating System","code":"22CSH-296"},{"Cname":"Database Management System","code":"22CSH-298"},{"Cname":"Software Design with UML","code":"22CSH-299"},{"Cname":"Operation Research","code":"22CSH-288"},{"Cname":"Computer Networks","code":"21CSH-396"},{"Cname":"Information Security","code":"21CSH-390"},{"Cname":"Artificial Intelligence","code":"21CSH-380"},{"Cname":"Data Mining and Analytics","code":"21CSH-388"},{"Cname":"Services Science and Service Operational Management lab","code":"20CSP-485"},{"Cname":"IT Project Management lab","code":"20CSP-492"},{"Cname":"Agile Practices","code":"22CSH-292"},{"Cname":"Git and Hub","code":"22CSH-293"},{"Cname":"DevOps on Cloud","code":"21CSH-382"},{"Cname":"AWS SOLUTION ARCHITECT","code":"23CSH-686"},{"Cname":"CLOUD AUTOMATION AND SCRIPTING FOR SYSTEM ADMINISTRATORS","code":"23CSH-687"}]
// })

// await prisma.teacher.createMany({
// data: [{"Tname":"Dr. Mandeep Tinna","ECode":"E1326","Department":"CSE"},{"Tname":"Dr. Aman Kaushik","ECode":"E5942","Department":"HOD CSE"},{"Tname":"Dr Nitin Jain","ECode":"E8466","Department":"CSE"},{"Tname":"Dr Krishnendu Rarhi","ECode":"E9621","Department":"PL-IS"},{"Tname":"Mr Pramod Vishwakarma","ECode":"E9758","Department":"CSE"},{"Tname":"Mr Gurpreet Singh","ECode":"E9842","Department":"CSE"},{"Tname":"Dr Monica Luthra","ECode":"E9836","Department":"CSE"},{"Tname":"Mr Digvijay Puri","ECode":"E10051","Department":"PL-CC"},{"Tname":"Mr Yogiraj Bhale","ECode":"E10488","Department":"PL-GG"},{"Tname":"Dr Monika Singh","ECode":"E11032","Department":"CSE"},{"Tname":"Dr Hariharan","ECode":"E11201","Department":"PL-AIML"},{"Tname":"Dr Deepak Kumar","ECode":"E11296","Department":"CSE"},{"Tname":"Ms Shivani Aggarwal","ECode":"E11286","Department":"CSE"},{"Tname":"Dr Gurwinder Singh","ECode":"E11253","Department":"Mathematics"},{"Tname":"Mr Harun","ECode":"E11421","Department":"CSE"},{"Tname":"Mr Namit Chawla","ECode":"E11486","Department":"CSE"},{"Tname":"Ms Yashika Sharma","ECode":"E11567","Department":"CSE"},{"Tname":"Ms Shweta","ECode":"E12791","Department":"CSE"},{"Tname":"Mr Saurabh Singhal","ECode":"E12800","Department":"CSE"},{"Tname":"Mr Abhishek Ankur","ECode":"E12833","Department":"CSE"},{"Tname":"Dr Vijay Bhardwaj","ECode":"E12849","Department":"CSE"},{"Tname":"Mr.Siddharth Kumar","ECode":"E12853","Department":"CSE"},{"Tname":"Ms Merry","ECode":"E12903","Department":"CSE"},{"Tname":"Mr Swapnil Raj","ECode":"E13017","Department":"CSE"},{"Tname":"Dr Vineet Mehan","ECode":"E13038","Department":"CSE"},{"Tname":"Ms Neeru Bala","ECode":"E13122","Department":"CSE"},{"Tname":"Ms. Shubhangi Mishra","ECode":"E13142","Department":"CSE"},{"Tname":"Mr. Nirmalya Basu","ECode":"E13248","Department":"CSE"},{"Tname":"Ms. Pragatie Chawla","ECode":"E13244","Department":"MBA"},{"Tname":"Mr Dayal Chandra Sati","ECode":"E13263","Department":"CSE"},{"Tname":"Ms.Lata Gupta","ECode":"E13365","Department":"CSE"},{"Tname":"Mr.Anil Manohar Dogra","ECode":"E13431","Department":"CSE"},{"Tname":"Mr.Pulkit Duivedi","ECode":"E13432","Department":"CSE"},{"Tname":"Mr. Kushagra Agarwal","ECode":"E13465","Department":"CSE"},{"Tname":"Mr. Bharat Tripathi","ECode":"E13475","Department":"CSE"},{"Tname":"Dr. Madan Lal Saini","ECode":"E13485","Department":"CSE"},{"Tname":"Mr Sant Kumar Maurya","ECode":"E13548","Department":"CSE"},{"Tname":"Dr.Priyanka Kaushik","ECode":"E13618","Department":"CSE"},{"Tname":"Mr.Krishna Kaushal Singh","ECode":"E13828","Department":"CSE"},{"Tname":"Mr Mohit Lalit","ECode":"E13845","Department":"CSE"},{"Tname":"Ms Amanpreet Kaur","ECode":"E13851","Department":"CSE"},{"Tname":"Dr Mahadev","ECode":"E13868","Department":"CSE"},{"Tname":"Ms Ravneet Kaur","ECode":"E11361","Department":"CSE"},{"Tname":"Dr Amit Vajpayee","ECode":"E14118","Department":"PL-BDA"},{"Tname":"Dr Deepti Sharma","ECode":"E14308","Department":"CSE"},{"Tname":"Ms. Shaveta Jain","ECode":"E13464","Department":"CSE"},{"Tname":"Dr Alankrita Aggarwal","ECode":"E14496","Department":"CSE"},{"Tname":"Dr Jitender ","ECode":"E14621","Department":"CSE"},{"Tname":"Ms Mansi Kajal","ECode":"E14871","Department":"CSE"},{"Tname":"Mr.Aadi Partap Singh","ECode":"E15043","Department":"CSE"},{"Tname":"Mr Aaskaran Bishnoi","ECode":"E15060","Department":"CSE"},{"Tname":"Dr Geeta Rani","ECode":"E15227","Department":"CSE"},{"Tname":"Dr Satinderjit Kaur","ECode":"E15282","Department":"CSE"},{"Tname":"Dr Surinder Chauhan","ECode":"E15372","Department":"CSE"},{"Tname":"Ms Aarti","ECode":"E15380","Department":"CSE"},{"Tname":"Dr.Mohit Angurala","ECode":"E15400","Department":"CSE"},{"Tname":"Mr Jagjit Singh","ECode":"E15190","Department":"CSE"},{"Tname":"Dr Ranjan Walia","ECode":"E14288","Department":"CSE"},{"Tname":"Dr Shweta Chauhan","ECode":"E14380","Department":"CSE"},{"Tname":"Dr Kalpana Singh","ECode":"E14950","Department":"CSE"},{"Tname":"Dr Ankit Garg","ECode":"E14961","Department":"CSE"},{"Tname":"Dr Dhawan Singh","ECode":"E14960","Department":"CSE"},{"Tname":"Dr. Sonal Rattan","ECode":"E15123","Department":"CSE"},{"Tname":"Mr Gaurav Soni","ECode":"E9610","Department":"CSE"},{"Tname":"Dr Archana Sharma","ECode":"E10375","Department":"CSE"},{"Tname":"Mr Nikhil Aggarwal","ECode":"E9191","Department":"PL-IOT&CSBS"},{"Tname":"Dr Anil Sharma","ECode":"E12015","Department":"Mathematics"},{"Tname":"Ms Savita","ECode":"E3620","Department":"Mathematics"},{"Tname":"Dr Manoj Gaur","ECode":"E14879","Department":"Mathematics"},{"Tname":"Ms Sheetal Laroiya","ECode":"E15433","Department":"CSE"},{"Tname":"Dr.Sanjeev Kumar","ECode":"E8752","Department":"CSE"},{"Tname":"Ms Nikita","ECode":"E15134","Department":"CSE"},{"Tname":"Ms Geetanjali","ECode":"E15507","Department":"CSE"},{"Tname":"Ms Tanvi","ECode":"E15506","Department":"CSE"},{"Tname":"Mr.Harmanjeet Singh","ECode":"E8042","Department":"CSE"},{"Tname":"Dr.Kamaljit Singh Saini","ECode":"E3040","Department":"CSE"},{"Tname":"Ms Mamta","ECode":"E15565","Department":"CSE"},{"Tname":"Mr Ankur Gupta","ECode":"E15733","Department":"CSE"},{"Tname":"Ms Jayashree Mohanty","ECode":"E15737","Department":"CSE"},{"Tname":"Ms Sonali Kapoor","ECode":"E15786","Department":"CSE"},{"Tname":"Mr Abhishek Tiwari","ECode":"E15792","Department":"CSE"},{"Tname":"Ms Upasana Tiwari","ECode":"E15791","Department":"CSE"},{"Tname":"Dr. Preet Kamal","ECode":"E15857","Department":"CSE"},{"Tname":"Mr Aman Kumar","ECode":"E15868","Department":"CSE"},{"Tname":"Ms Komal Mehta","ECode":"E15888","Department":"CSE"},{"Tname":"Ms Pavandeep Kaur","ECode":"E15947","Department":"CSE"},{"Tname":"Mr Jaswinder Singh","ECode":"E15978","Department":"CSE"},{"Tname":"Ms Bhavna Nayyer","ECode":"E15505","Department":"CSE"},{"Tname":"Mr Ankur Sharma","ECode":"E13693","Department":"CSE"},{"Tname":"Dr Navjeet Kaur","ECode":"E16069","Department":"CSE"},{"Tname":"Ms Nitika","ECode":"E16159","Department":"CSE"},{"Tname":"Ms.Kirti","ECode":"E16189","Department":"CSE"},{"Tname":"Ms Ruksana","ECode":"E16227","Department":"CSE"},{"Tname":"Dr Amit Kukkar","ECode":"E16298","Department":"CSE"},{"Tname":"Dr Raghav Mehra","ECode":"E16302","Department":"CSE"},{"Tname":"Ms Geetanjali Pandey","ECode":"E16323","Department":"CSE"},{"Tname":"Ms Anudeep Kaur","ECode":"E16380","Department":"CSE"},{"Tname":"Ms Reema","ECode":"E16536","Department":"CSE"},{"Tname":"Mr Tejinderpal Singh","ECode":"E16552","Department":"CSE"},{"Tname":"Ms Sakshi","ECode":"E16561","Department":"CSE"},{"Tname":"Ms Preeti Khera","ECode":"E16576","Department":"CSE"},{"Tname":"Ms Gurpreet Kaur","ECode":"E16578","Department":"CSE"},{"Tname":"Ms. Rubbina","ECode":"E16582","Department":"CSE"},{"Tname":"Mr. Sohan Goswami","ECode":"E16584","Department":"CSE"},{"Tname":"Mr. Prabjot Singh","ECode":"E16592","Department":"CSE"},{"Tname":"Ms. Ayesha Sikka","ECode":"E14360","Department":"CSE"},{"Tname":"Mr. Saurav Kumar Chauhan","ECode":"E16638","Department":"CSE"},{"Tname":"Mr.Uzzal Mondal","ECode":"E16641","Department":"CSE"},{"Tname":"Mr Mohd Javaid UL Islam","ECode":"E16644","Department":"CSE"},{"Tname":"Ms Prabhjot Kaur","ECode":"E16646","Department":"CSE"},{"Tname":"Ms.Ritu Parna","ECode":"E16660","Department":"CSE"},{"Tname":"Mr. Shubham","ECode":"E16661","Department":"CSE"},{"Tname":"Mr Rosevir Singh","ECode":"E16685","Department":"CSE"},{"Tname":"Ms Shakshi Kattna","ECode":"E16687","Department":"CSE"},{"Tname":"Ms.Priyanka Nanda ","ECode":"E16695","Department":"CSE"},{"Tname":"Ms Neha Sharma","ECode":"E12652","Department":"CSE"},{"Tname":"Dr. Ratish Kumar","ECode":"E14394","Department":"CSE"},{"Tname":"Ms. Neetu","ECode":"E17077","Department":"CSE"},{"Tname":"Dr.Girish Paliwal","ECode":"E17079","Department":"CSE"},{"Tname":"Ms.Somdatta Patra ","ECode":"E15047","Department":"CSE"},{"Tname":"Dr.Abhishek Pandey","ECode":"E17100","Department":"CSE"}]
// })

// await prisma.branch.createMany({
//     data: [{'id': 'BDA'}, {'id': 'CSBS'}, {'id': 'DevOps'}, {'id': 'IS'}, {'id': 'CC'}, {'id': 'BCB'}, {'id': 'AIML'}, {'id': 'GG'}, {'id': 'IoT'}, {'id': 'Kargil'}]
// })

await prisma.user.deleteMany();