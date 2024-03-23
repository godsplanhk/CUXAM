import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//courses

// await prisma.course.createMany({
//     data: [
//         {
//             "name": "Data Structure",
//             "code": "22CSH-241"
//         },
//         {
//             "name": "Database Management System",
//             "code": "22CSH-243"
//         },
//         {
//             "name": "Operating System",
//             "code": "22CSH-242"
//         },
//         {
//             "name": "Programming in Java",
//             "code": "22CSH-244"
//         },
//         {
//             "name": "COMPUTER NETWORKS",
//             "code": "21CSH-335"
//         },
//         {
//             "name": "DOCKERS AND KUBERNETES LAB",
//             "code": "21CSP-343"
//         },
//         {
//             "name": "ADVANCED MACHINE LEARNING",
//             "code": "21CSH-346"
//         },
//         {
//             "name": "SOFT COMPUTING",
//             "code": "21CSH-345"
//         },
//         {
//             "name": "DATA MINING AND WAREHOUSING",
//             "code": "21CSH-334"
//         },
//         {
//             "name": "ADVANCED DATABASE MANAGEMENT LAB",
//             "code": "20CSP-436"
//         },
//         {
//             "name": "DEEP LEARNING LAB",
//             "code": "20CSF-431"
//         }
//     ]
// })

//batch
// await prisma.batches.createMany({
//     data:[
//         {
//             "id":"22AML",
//             "branch": "AML",
//             "semester": "4"
//         },
//         {
//             "id":"21AML",
//             "branch":"AML",
//             "semester":"6"
          
//         },
//         {
//             "id":"20AML",
//             "branch":"AML",
//             "semester":"8"
//         }
//     ]
// })

// //teacher
// await prisma.teacher.createMany({
//     data:[
// {"Tname": "DR ABHINEET ANAND", "ECode": "E13847"}, {"Tname": "DR RASMEET SINGH BALI", "ECode": "E1857"}, {"Tname": "DR  MANDEEP TINNA", "ECode": "E1326"}, {"Tname": "DR  AMAN KAUSHIK", "ECode": "E5942"}, {"Tname": "DR NITIN JAIN", "ECode": "E8466"}, {"Tname": "DR SHIKHA GUPTA", "ECode": "E8741"}, {"Tname": "DR KRISHNENDU RARHI", "ECode": "E9621"}, {"Tname": "MR PRAMOD VISHWAKARMA", "ECode": "E9758"}, {"Tname": "MR GURPREET SINGH", "ECode": "E9842"}, {"Tname": "DR MONICA LUTHRA", "ECode": "E9836"}, {"Tname": "MR DIGVIJAY PURI", "ECode": "E10051"}, {"Tname": "MR YOGIRAJ BHALE", "ECode": "E10488"}, {"Tname": "DR MONIKA SINGH", "ECode": "E11032"}, {"Tname": "DR HARIHARAN", "ECode": "E11201"}, {"Tname": "DR DEEPAK KUMAR", "ECode": "E11296"}, {"Tname": "MS SHIVANI AGGARWAL", "ECode": "E11286"}, {"Tname": "DR GURWINDER SINGH", "ECode": "E11253"}, {"Tname": "MR HARUN", "ECode": "E11421"}, {"Tname": "MR NAMIT CHAWLA", "ECode": "E11486"}, {"Tname": "MS YASHIKA SHARMA", "ECode": "E11567"}, {"Tname": "MS MANISHA", "ECode": "E11606"}, {"Tname": "MS NEHA SHARMA", "ECode": "E12652"}, {"Tname": "MS SHWETA", "ECode": "E12791"}, {"Tname": "MR SAURABH SINGHAL", "ECode": "E12800"}, {"Tname": "MR ABHISHEK ANKUR", "ECode": "E12833"}, {"Tname": "DR VIJAY BHARDWAJ", "ECode": "E12849"}, {"Tname": "MR SIDDHARTH KUMAR", "ECode": "E12853"}, {"Tname": "MS MERRY", "ECode": "E12903"}, {"Tname": "MR SWAPNIL RAJ", "ECode": "E13017"}, {"Tname": "DR VINEET MEHAN", "ECode": "E13038"}, {"Tname": "MS NEERU BALA", "ECode": "E13122"}, {"Tname": "MS  SHUBHANGI MISHRA", "ECode": "E13142"}, {"Tname": "DR ABHISHEK KHANNA", "ECode": "E13236"}, {"Tname": "MR  NIRMALYA BASU", "ECode": "E13248"}, {"Tname": "MS  PRAGATIE", "ECode": "E13244"}, {"Tname": "MR DAYAL CHANDRA SATI", "ECode": "E13263"}, {"Tname": "MS BANITA MANDAL", "ECode": "E13349"}, {"Tname": "MS LATA GUPTA", "ECode": "E13365"}, {"Tname": "MR ANIL MANOHAR DOGRA", "ECode": "E13431"}, {"Tname": "MR PULKIT DUIVEDI", "ECode": "E13432"}, {"Tname": "MS HARSHLEEN KAUR", "ECode": "E13419"}, {"Tname": "MS SUKHMEET KAUR", "ECode": "E13420"}, {"Tname": "MR  KUSHAGRA AGARWAL", "ECode": "E13465"}, {"Tname": "MR  BHARAT TRIPATHI", "ECode": "E13475"}, {"Tname": "DR  MADAN LAL SAINI", "ECode": "E13485"}, {"Tname": "MR SANT KUMAR MAURYA", "ECode": "E13548"}, {"Tname": "DR PRIYANKA KAUSHIK", "ECode": "E13618"}, {"Tname": "MR VIKAS KUMAR", "ECode": "E13657"}, {"Tname": "MR KRISHNA KAUSHAL SINGH", "ECode": "E13828"}, {"Tname": "MR MOHIT LALIT", "ECode": "E13845"}, {"Tname": "MS AMANPREET KAUR", "ECode": "E13851"}, {"Tname": "DR MAHADEV", "ECode": "E13868"}, {"Tname": "MS RAVNEET KAUR", "ECode": "E11361"}, {"Tname": "MS RAMANJOT KAUR", "ECode": "E13987"}, {"Tname": "MS SAVITA BANSAL", "ECode": "E14045"}, {"Tname": "DR AMIT VAJPAYEE", "ECode": "E14118"}, {"Tname": "MR CHANDER PARTAP SINGH", "ECode": "E12224"}, {"Tname": "MS AKANSHA MORAL", "ECode": "E14277"}, {"Tname": "DR DEEPTI SHARMA", "ECode": "E14308"}, {"Tname": "MS  SHAVETA JAIN", "ECode": "E13464"}, {"Tname": "DR  RATISH KUMAR", "ECode": "E14394"}, {"Tname": "MS SHIWANI SHARMA", "ECode": "E14425"}, {"Tname": "DR ALANKRITA AGGARWAL", "ECode": "E14496"}, {"Tname": "DR JITENDER", "ECode": "E14621"}, {"Tname": "MS MANSI KAJAL", "ECode": "E14871"}, {"Tname": "MR CHANDAN SHARMA", "ECode": "E14906"}, {"Tname": "DR  MARAM BALAJEE", "ECode": "E15007"}, {"Tname": "MR AADI PARTAP SINGH", "ECode": "E15043"}, {"Tname": "MR MUKESH BIRLA", "ECode": "E15063"}, {"Tname": "MR AASKARAN BISHNOI", "ECode": "E15060"}, {"Tname": "DR GEETA RANI", "ECode": "E15227"}, {"Tname": "DR SATINDERJIT KAUR", "ECode": "E15282"}, {"Tname": "DR SURINDER CHAUHAN", "ECode": "E15372"}, {"Tname": "MS AARTI", "ECode": "E15380"}, {"Tname": "MR SAGAR MONGA", "ECode": "E15398"}, {"Tname": "DR MOHIT ANGURALA", "ECode": "E15400"}, {"Tname": "MR JAGJIT SINGH", "ECode": "E15190"}, {"Tname": "DR RANJAN WALIA", "ECode": "E14288"}, {"Tname": "DR SHWETA CHAUHAN", "ECode": "E14380"}, {"Tname": "DR SARITA SIMAIYA", "ECode": "E14422"}, {"Tname": "DR KALPANA SINGH", "ECode": "E14950"}, {"Tname": "DR ANKIT GARG", "ECode": "E14961"}, {"Tname": "DR DHAWAN SINGH", "ECode": "E14960"}, {"Tname": "DR  SONAL RATTAN", "ECode": "E15123"}, {"Tname": "MS  RAJAT TIWARI", "ECode": "E1172"}, {"Tname": "MR GAURAV SONI", "ECode": "E9610"}, {"Tname": "DR ARCHNA SHARMA", "ECode": "E10375"}, {"Tname": "MR NIKHIL AGGARWAL", "ECode": "E9191"}, {"Tname": "DR ANIL SHARMA", "ECode": "E12015"}, {"Tname": "MS SAVITA", "ECode": "E3620"}, {"Tname": "DR MANOJ GAUR", "ECode": "E14879"}, {"Tname": "MS SHEETAL LAROIYA", "ECode": "E15433"}, {"Tname": "DR SANJEEV KUMAR", "ECode": "E8752"}, {"Tname": "MS NIKITA", "ECode": "E15134"}, {"Tname": "MS GEETANJALI", "ECode": "E15507"}, {"Tname": "MS TANVI", "ECode": "E15506"}, {"Tname": "MR HARMANJEET SINGH", "ECode": "E8042"}, {"Tname": "MS SONIA", "ECode": "E15520"}, {"Tname": "DR KAMALJIT SINGH SAINI", "ECode": "E3040"}, {"Tname": "MR GAURAV GUPTA", "ECode": "E15544"}, {"Tname": "MS PRIYANKA JAMMWAL", "ECode": "E15553"}, {"Tname": "MS MAMTA", "ECode": "E15565"}, {"Tname": "MR ANKUR GUPTA", "ECode": "E15733"}, {"Tname": "MS JAYASHREE MOHANTY", "ECode": "E15737"}, {"Tname": "MR SHAILESH KUMAR", "ECode": "E15783"}, {"Tname": "MS SONALI KAPOOR", "ECode": "E15786"}, {"Tname": "MR ABHISHEK TIWARI", "ECode": "E15792"}, {"Tname": "MS UPASANA TIWARI", "ECode": "E15791"}, {"Tname": "DR  PREET KAMAL", "ECode": "E15857"}, {"Tname": "DR  GAGANDEEP", "ECode": "E15862"}, {"Tname": "MR AMAN KUMAR", "ECode": "E15868"}, {"Tname": "MS KOMAL MEHTA", "ECode": "E15888"}, {"Tname": "MS PAVANDEEP KAUR", "ECode": "E15947"}, {"Tname": "MR JASWINDER SINGH", "ECode": "E15978"}, {"Tname": "MS BHAVNA NAYYER", "ECode": "E15505"}, {"Tname": "MR ANKUR SHARMA", "ECode": "E13693"}, {"Tname": "DR NAVJEET KAUR", "ECode": "E16069"}, {"Tname": "MS MAITRI MANYA", "ECode": "E16106"}, {"Tname": "MS NITIKA", "ECode": "E16159"}, {"Tname": "MS KIRTI", "ECode": "E16189"}, {"Tname": "MS RUKSANA", "ECode": "E16227"}, {"Tname": "DR AMIT KUKKAR", "ECode": "E16298"}, {"Tname": "DR RAGHAV MEHRA", "ECode": "E16302"}, {"Tname": "MR  TUSHAR BARAI", "ECode": "E16308"}, {"Tname": "MS GEETANJALI", "ECode": "E16323"}    ]
// })

// //batchCourse
// await prisma.batchCourse.createMany({
//     data:[
//         {"batch":"22AML","Ccode":"22CSH-241"},
// {"batch":"22AML","Ccode":"22CSH-243"},
// {"batch":"22AML","Ccode":"22CSH-242"},
// {"batch":"22AML","Ccode":"22CSH-244"},
// {"batch":"21AML","Ccode":"21CSH-335"},
// {"batch":"21AML","Ccode":"21CSP-343"},
// {"batch":"21AML","Ccode":"21CSH-346"},
// {"batch":"21AML","Ccode":"21CSH-345"},
// {"batch":"21AML","Ccode":"21CSH-334"},
// {"batch":"20AML","Ccode":"20CSP-436"},
// {"batch":"20AML","Ccode":"20CSF-431"}]
// })

//section
// await prisma.section.createMany({
//     data:[
//         {"id":"22AML1/A","batch":"22AML","group":"A"},
// {"id":"22AML1/B","batch":"22AML","group":"B"},
// {"id":"22AML2/A","batch":"22AML","group":"A"},
// {"id":"22AML2/B","batch":"22AML","group":"B"},
// {"id":"22AML3/A","batch":"22AML","group":"A"},
// {"id":"22AML3/B","batch":"22AML","group":"B"},
// {"id":"22AML4/A","batch":"22AML","group":"A"},
// {"id":"22AML4/B","batch":"22AML","group":"B"},
// {"id":"22AML5/A","batch":"22AML","group":"A"},
// {"id":"22AML5/B","batch":"22AML","group":"B"},
// {"id":"22AML6/A","batch":"22AML","group":"A"},
// {"id":"22AML6/B","batch":"22AML","group":"B"},
// {"id":"22AML7/A","batch":"22AML","group":"A"},
// {"id":"22AML7/B","batch":"22AML","group":"B"},
// {"id":"22AML8/A","batch":"22AML","group":"A"},
// {"id":"22AML8/B","batch":"22AML","group":"B"},
// {"id":"22AML9/A","batch":"22AML","group":"A"},
// {"id":"22AML9/B","batch":"22AML","group":"B"},
// {"id":"22AML10/A","batch":"22AML","group":"A"},
// {"id":"22AML10/B","batch":"22AML","group":"B"},
// {"id":"22AML11/A","batch":"22AML","group":"A"},
// {"id":"22AML11/B","batch":"22AML","group":"B"},
// {"id":"21AML1/A","batch":"21AML","group":"A"},
// {"id":"21AML1/B","batch":"21AML","group":"B"},
// {"id":"21AML2/A","batch":"21AML","group":"A"},
// {"id":"21AML2/B","batch":"21AML","group":"B"},
// {"id":"21AML3/A","batch":"21AML","group":"A"},
// {"id":"21AML3/B","batch":"21AML","group":"B"},
// {"id":"21AML4/A","batch":"21AML","group":"A"},
// {"id":"21AML4/B","batch":"21AML","group":"B"},
// {"id":"21AML5/A","batch":"21AML","group":"A"},
// {"id":"21AML5/B","batch":"21AML","group":"B"},
// {"id":"21AML6/A","batch":"21AML","group":"A"},
// {"id":"21AML6/B","batch":"21AML","group":"B"},
// {"id":"21AML7/A","batch":"21AML","group":"A"},
// {"id":"21AML7/B","batch":"21AML","group":"B"},
// {"id":"21AML8/A","batch":"21AML","group":"A"},
// {"id":"21AML8/B","batch":"21AML","group":"B"},
// {"id":"21AML9/A","batch":"21AML","group":"A"},
// {"id":"21AML9/B","batch":"21AML","group":"B"},
// {"id":"21AML10/A","batch":"21AML","group":"A"},
// {"id":"21AML10/B","batch":"21AML","group":"B"},
// {"id":"21AML11/A","batch":"21AML","group":"A"},
// {"id":"21AML11/B","batch":"21AML","group":"B"},
// {"id":"21AML12/A","batch":"21AML","group":"A"},
// {"id":"21AML12/B","batch":"21AML","group":"B"},
// {"id":"20AML1/A","batch":"20AML","group":"A"},
// {"id":"20AML1/B","batch":"20AML","group":"B"},
// {"id":"20AML2/A","batch":"20AML","group":"A"},
// {"id":"20AML2/B","batch":"20AML","group":"B"},
// {"id":"20AML3/A","batch":"20AML","group":"A"},
// {"id":"20AML3/B","batch":"20AML","group":"B"},
// {"id":"20AML4/A","batch":"20AML","group":"A"},
// {"id":"20AML4/B","batch":"20AML","group":"B"},
// {"id":"20AML5/A","batch":"20AML","group":"A"},
// {"id":"20AML5/B","batch":"20AML","group":"B"},
// {"id":"20AML6/A","batch":"20AML","group":"A"},
// {"id":"20AML6/B","batch":"20AML","group":"B"},
//     ]
// })

//
// const InternalTeacher = [
//   {
//     Tname: "MR SHAILESH KUMAR",
//     ECode: "E15783",
//   }, {
//     Tname: "MS LATA GUPTA",
//     ECode: "E13365",
//   }, {
//     Tname: "MR MOHIT LALIT",
//     ECode: "E13845",
//   }, {
//     Tname: "MS SHIVANI AGGARWAL",
//     ECode: "E11286",
//   }, {
//     Tname: "MS UPASANA TIWARI",
//     ECode: "E15791",
//   }, {
//     Tname: "MS AMANPREET KAUR",
//     ECode: "E13851",
//   }, {
//     Tname: "MS SHIVANI AGGARWAL",
//     ECode: "E11286",
//   }, {
//     Tname: "MR AADI PARTAP SINGH",
//     ECode: "E15043",
//   }, {
//     Tname: "MR AASKARAN BISHNOI",
//     ECode: "E15060",
//   }, {
//     Tname: "MS GEETANJALI",
//     ECode: "E15507",
//   }, {
//     Tname: "MS KIRTI",
//     ECode: "E16189",
//   }, {
//     Tname: "MR AADI PARTAP SINGH",
//     ECode: "E15043",
//   }, {
//     Tname: "DR AMIT KUKKAR",
//     ECode: "E16298",
//   }, {
//     Tname: "MR SAURABH SINGHAL",
//     ECode: "E12800",
//   }, {
//     Tname: "MS SHAVETA JAIN",
//     ECode: "E13464",
//   }, {
//     Tname: "MS AMANPREET KAUR",
//     ECode: "E13851",
//   }, {
//     Tname: "MS NEERU BALA",
//     ECode: "E13122",
//   }, {
//     Tname: "MR  KUSHAGRA AGARWAL",
//     ECode: "E13465",
//   }, {
//     Tname: "MR SANT KUMAR",
//     ECode: "E13548",
//   }, {
//     Tname: "DR SURINDER CHAUHAN",
//     ECode: "E15372",
//   }, {
//     Tname: "DR RAGHAV MEHRA",
//     ECode: "E16302",
//   }, {
//     Tname: "DR MOHIT ANGURALA",
//     ECode: "E15400",
//   }, {
//     Tname: "MR AADI PARTAP SINGH",
//     ECode: "E15043",
//   }, {
//     Tname: "MR AASKARAN BISHNOI",
//     ECode: "E15060",
//   }, {
//     Tname: "DR MOHIT ANGURALA",
//     ECode: "E15400",
//   }, {
//     Tname: "MS KIRTI",
//     ECode: "E16189",
//   }, {
//     Tname: "MS GEETANJALI",
//     ECode: "E15507",
//   }, {
//     Tname: "DR AMIT KUKKAR",
//     ECode: "E16298",
//   }, {
//     Tname: "MR SAURABH SINGHAL",
//     ECode: "E12800",
//   }, {
//     Tname: "MS SHAVETA JAIN",
//     ECode: "E13464",
//   }, {
//     Tname: "MS AMANPREET KAUR",
//     ECode: "E13851",
//   }, {
//     Tname: "MS NEERU BALA",
//     ECode: "E13122",
//   }, {
//     Tname: "MR  KUSHAGRA AGARWAL",
//     ECode: "E13465",
//   }, {
//     Tname: "MR SANT KUMAR",
//     ECode: "E13548",
//   }, {
//     Tname: "MS NEHA SHARMA",
//     ECode: "E12652",
//   }, {
//     Tname: "DR RAGHAV MEHRA",
//     ECode: "E16302",
//   }, {
//     Tname: "DR MOHIT ANGURALA",
//     ECode: "E15400",
//   }, {
//     Tname: "MS TANVI",
//     ECode: "E15506",
//   }, {
//     Tname: "MR SHAILESH KUMAR",
//     ECode: "E15783",
//   }, {
//     Tname: "MR MOHIT LALIT",
//     ECode: "E13845",
//   }, {
//     Tname: "MR MOHIT LALIT",
//     ECode: "E13845",
//   }, {
//     Tname: "MS SHIVANI AGGARWAL",
//     ECode: "E11286",
//   }, {
//     Tname: "MS UPASANA TIWARI",
//     ECode: "E15791",
//   }, {
//     Tname: "MR HARMANJEET SINGH",
//     ECode: "E8042",
//   }, {
//     Tname: "DR AMIT KUKKAR",
//     ECode: "E16298",
//   }, {
//     Tname: "MR SAURABH SINGHAL",
//     ECode: "E12800",
//   }, {
//     Tname: "MS SHAVETA JAIN",
//     ECode: "E13464",
//   }, {
//     Tname: "MS AMANPREET KAUR",
//     ECode: "E13851",
//   }, {
//     Tname: "MS NEERU BALA",
//     ECode: "E13122",
//   }, {
//     Tname: "MR  KUSHAGRA AGARWAL",
//     ECode: "E13465",
//   }, {
//     Tname: "MR SANT KUMAR",
//     ECode: "E13548",
//   }, {
//     Tname: "DR SURINDER CHAUHAN",
//     ECode: "E15372",
//   }, {
//     Tname: "MR MUKESH BIRLA",
//     ECode: "E15063",
//   }, {
//     Tname: "DR SANJEEV KUMAR",
//     ECode: "E8752",
//   }, {
//     Tname: "MS NIKITA",
//     ECode: "E15134",
//   }, {
//     Tname: "MS SHIVANI AGGARWAL",
//     ECode: "E11286",
//   }, {
//     Tname: "MR MOHIT LALIT",
//     ECode: "E13845",
//   }, {
//     Tname: "MS RUKSANA",
//     ECode: "E16227",
//   }, {
//     Tname: "MS UPASANA TIWARI",
//     ECode: "E15791",
//   }, {
//     Tname: "MR AADI PARTAP SINGH",
//     ECode: "E15043",
//   }, {
//     Tname: "MR AASKARAN BISHNOI",
//     ECode: "E15060",
//   }, {
//     Tname: "MS KIRTI",
//     ECode: "E16189",
//   }, {
//     Tname: "MS KIRTI",
//     ECode: "E16189",
//   }, {
//     Tname: "MR JAGJIT SINGH",
//     ECode: "E15190",
//   }, {
//     Tname: "MR  KUSHAGRA AGARWAL",
//     ECode: "E13465",
//   }, {
//     Tname: "MR SANT KUMAR",
//     ECode: "E13548",
//   }, {
//     Tname: "MS NEHA SHARMA",
//     ECode: "E12652",
//   }, {
//     Tname: "MR SANT KUMAR",
//     ECode: "E13548",
//   }, {
//     Tname: "MR SANT KUMAR",
//     ECode: "E13548",
//   }, {
//     Tname: "MS PRAGATIE",
//     ECode: "E13244",
//   }, {
//     Tname: "MS LATA GUPTA",
//     ECode: "E13365",
//   }, {
//     Tname: "MR MOHIT LALIT",
//     ECode: "E13845",
//   }, {
//     Tname: "MS SHIVANI AGGARWAL",
//     ECode: "E11286",
//   }, {
//     Tname: "MS UPASANA TIWARI",
//     ECode: "E15791",
//   }, {
//     Tname: "MR AADI PARTAP SINGH",
//     ECode: "E15043",
//   }, {
//     Tname: "DR KALPANA",
//     ECode: "E14950",
//   }, {
//     Tname: "MS GEETANJALI",
//     ECode: "E15507",
//   }, {
//     Tname: "MS KIRTI",
//     ECode: "E16189",
//   }, {
//     Tname: "MR JAGJIT SINGH",
//     ECode: "E15190",
//   }, {
//     Tname: "DR AMIT KUKKAR",
//     ECode: "E16298",
//   }, {
//     Tname: "MS SHAVETA JAIN",
//     ECode: "E13464",
//   }, {
//     Tname: "MS SHAVETA JAIN",
//     ECode: "E13464",
//   }, {
//     Tname: "MS AMANPREET KAUR",
//     ECode: "E13851",
//   }, {
//     Tname: "MS NEERU BALA",
//     ECode: "E13122",
//   }, {
//     Tname: "DR MOHIT ANGURALA",
//     ECode: "E15400",
//   }, {
//     Tname: "MR JAGJIT SINGH",
//     ECode: "E15190",
//   }, {
//     Tname: "MR JAGJIT SINGH",
//     ECode: "E15190",
//   }, {
//     Tname: "DR MOHIT ANGURALA",
//     ECode: "E15400",
//   }, {
//     Tname: "MR KRISHNA KAUSHAL",
//     ECode: "E13828",
//   }, {
//     Tname: "DR RATISH KUMAR",
//     ECode: "E14394",
//   }, {
//     Tname: "DR PRIYANKA KAUSHIK",
//     ECode: "E13618",
//   }, {
//     Tname: "DR ALANKRITA AGGARWAL",
//     ECode: "E14496",
//   }, {
//     Tname: "MR NIRMALYA BASU",
//     ECode: "E13248",
//   }, {
//     Tname: "MR KRISHNA KAUSHAL",
//     ECode: "E13828",
//   }, {
//     Tname: "DR RATISH KUMAR",
//     ECode: "E14394",
//   }, {
//     Tname: "DR PRIYANKA KAUSHIK",
//     ECode: "E13618",
//   }, {
//     Tname: "DR ALANKRITA AGGARWAL",
//     ECode: "E14496",
//   }, {
//     Tname: "MR NIRMALYA BASU",
//     ECode: "E13248",
//   }, {
//     Tname: "MR KRISHNA KAUSHAL",
//     ECode: "E13828",
//   }, {
//     Tname: "DR RAGHAV MEHRA",
//     ECode: "E16302",
//   }, {
//     Tname: "DR PRIYANKA KAUSHIK",
//     ECode: "E13618",
//   }, {
//     Tname: "DR MAHADEV",
//     ECode: "E13868",
//   }, {
//     Tname: "MR NIRMALYA BASU",
//     ECode: "E13248",
//   }, {
//     Tname: "MR AASKARAN BISHNOI",
//     ECode: "E15060",
//   }, {
//     Tname: "DR MAHADEV",
//     ECode: "E13868",
//   }, {
//     Tname: "DR RAGHAV MEHRA",
//     ECode: "E16302",
//   }, {
//     Tname: "DR PRIYANKA KAUSHIK",
//     ECode: "E13618",
//   }, {
//     Tname: "MS LATA GUPTA",
//     ECode: "E13365",
//   }, {
//     Tname: "MR MUKESH BIRLA",
//     ECode: "E15063",
//   }, {
//     Tname: "DR JITENDER",
//     ECode: "E14621",
//   }, {
//     Tname: "DR VINEET MEHAN",
//     ECode: "E13038",
//   }, {
//     Tname: "DR VIJAY BHARDWAJ",
//     ECode: "E12849",
//   }, {
//     Tname: "MS SHUBHANGI",
//     ECode: "E13142",
//   }, {
//     Tname: "DR MONIKA SINGH",
//     ECode: "E11032",
//   }, {
//     Tname: "MS AARTI",
//     ECode: "E15380",
//   }, {
//     Tname: "DR JITENDER",
//     ECode: "E14621",
//   }, {
//     Tname: "MS MAMTA",
//     ECode: "E15565",
//   }, {
//     Tname: "MS SHUBHANGI MISHRA",
//     ECode: "E13142",
//   }, {
//     Tname: "DR VINEET MEHAN",
//     ECode: "E13038",
//   }, {
//     Tname: "MR MUKESH BIRLA",
//     ECode: "E15063",
//   }, {
//     Tname: "DR JITENDER",
//     ECode: "E14621",
//   }, {
//     Tname: "DR VIJAY BHARDWAJ",
//     ECode: "E12849",
//   }, {
//     Tname: "DR SARITA SIMAIYA",
//     ECode: "E14422",
//   }, {
//     Tname: "MS RUKSANA",
//     ECode: "E16227",
//   }, {
//     Tname: "DR JITENDER",
//     ECode: "E14621",
//   }, {
//     Tname: "DR MOHIT ANGURALA",
//     ECode: "E15400",
//   }, {
//     Tname: "DR VIJAY BHARDWAJ",
//     ECode: "E12849",
//   }, {
//     Tname: "DR SARITA SIMAIYA",
//     ECode: "E14422",
//   }, {
//     Tname: "DR VIJAY BHARDWAJ",
//     ECode: "E12849",
//   }, {
//     Tname: "DR SONAL RATTAN",
//     ECode: "E15123",
//   }, {
//     Tname: "DR JITENDER",
//     ECode: "E14621",
//   }, {
//     Tname: "MR SIDDHARTH KUMAR",
//     ECode: "E12853",
//   }, {
//     Tname: "MS RAMANJOT KAUR",
//     ECode: "E13987",
//   }, {
//     Tname: "DR VIJAY BHARDWAJ",
//     ECode: "E12849",
//   }, {
//     Tname: "DR SONAL RATTAN",
//     ECode: "E15123",
//   }, {
//     Tname: "DR JITENDER",
//     ECode: "E14621",
//   }, {
//     Tname: "MR SIDDHARTH KUMAR",
//     ECode: "E12853",
//   }, {
//     Tname: "MS RAMANJOT KAUR",
//     ECode: "E13987",
//   }, {
//     Tname: "MS SONALI KAPOOR",
//     ECode: "E15786",
//   }, {
//     Tname: "MS NITIKA",
//     ECode: "E16159",
//   }, {
//     Tname: "MR SIDDHARTH KUMAR",
//     ECode: "E12853",
//   }, {
//     Tname: "DR VIJAY BHARDWAJ",
//     ECode: "E12849",
//   }, {
//     Tname: "MS SHUBHANGI",
//     ECode: "E13142",
//   }, {
//     Tname: "MR DAYAL SATI",
//     ECode: "E13263",
//   }, {
//     Tname: "MR SIDDHARTH KUMAR",
//     ECode: "E12853",
//   }, {
//     Tname: "MS RUKSANA",
//     ECode: "E16227",
//   }, {
//     Tname: "MS NITIKA",
//     ECode: "E16159",
//   }, {
//     Tname: "MR NIRMALYA BASU",
//     ECode: "E13248",
//   }, {
//     Tname: "MR JASWINDER SINGH",
//     ECode: "E15978",
//   }, {
//     Tname: "MS HARSHLEEN KAUR",
//     ECode: "E13419",
//   }, {
//     Tname: "MS MERRY",
//     ECode: "E12903",
//   }, {
//     Tname: "DR SHWETA CHAUHAN",
//     ECode: "E14380",
//   }, {
//     Tname: "DR  MANDEEP TINNA",
//     ECode: "E1326",
//   }, {
//     Tname: "MR SHAILESH KUMAR",
//     ECode: "E15783",
//   }, {
//     Tname: "MS HARSHLEEN KAUR",
//     ECode: "E13419",
//   }, {
//     Tname: "MR SAGAR MONGA",
//     ECode: "E15398",
//   }, {
//     Tname: "DR SHWETA CHAUHAN",
//     ECode: "E14380",
//   }, {
//     Tname: "MR JASWINDER SINGH",
//     ECode: "E15978",
//   }, {
//     Tname: "MS SONALI KAPOOR",
//     ECode: "E15786",
//   }, {
//     Tname: "MR YOGIRAJ BHALE",
//     ECode: "E10488",
//   }, {
//     Tname: "MS RAJAT TIWARI",
//     ECode: "E1172",
//   }, {
//     Tname: "MS RUKSANA",
//     ECode: "E16227",
//   }, {
//     Tname: "MS RAMANJOT KAUR",
//     ECode: "E13987",
//   }, {
//     Tname: "MS SONALI KAPOOR",
//     ECode: "E15786",
//   }, {
//     Tname: "MR SAGAR MONGA",
//     ECode: "E15398",
//   }, {
//     Tname: "MS RAJAT TIWARI",
//     ECode: "E1172",
//   }, {
//     Tname: "MS RUKSANA",
//     ECode: "E16227",
//   }, {
//     Tname: "MS RAMANJOT KAUR",
//     ECode: "E13987",
//   }, {
//     Tname: "MR DAYAL CHANDRA SATI",
//     ECode: "E13263",
//   }, {
//     Tname: "DR RATISH KUMAR",
//     ECode: "E14394",
//   }, {
//     Tname: "MS NITIKA",
//     ECode: "E16159",
//   }, {
//     Tname: "MS AARTI",
//     ECode: "E15380",
//   }, {
//     Tname: "DR SATINDERJIT KAUR",
//     ECode: "E15282",
//   }, {
//     Tname: "MR DAYAL SATI",
//     ECode: "E13263",
//   }, {
//     Tname: "DR RATISH KUMAR",
//     ECode: "E14394",
//   }, {
//     Tname: "MS MERRY",
//     ECode: "E12903",
//   }, {
//     Tname: "MS AARTI",
//     ECode: "E15380",
//   }, {
//     Tname: "DR SATINDERJIT KAUR",
//     ECode: "E15282",
//   }, {
//     Tname: "MR DAYAL SATI",
//     ECode: "E13263",
//   }, {
//     Tname: "DR RATISH KUMAR",
//     ECode: "E14394",
//   }, {
//     Tname: "MS TANVI",
//     ECode: "E15506",
//   }, {
//     Tname: "MS AARTI",
//     ECode: "E15380",
//   }, {
//     Tname: "DR SATINDERJIT KAUR",
//     ECode: "E15282",
//   }, {
//     Tname: "MR DAYAL SATI",
//     ECode: "E13263",
//   }, {
//     Tname: "DR RATISH KUMAR",
//     ECode: "E14394",
//   }, {
//     Tname: "MS TANVI",
//     ECode: "E15506",
//   }, {
//     Tname: "MS AARTI",
//     ECode: "E15380",
//   }, {
//     Tname: "DR ALANKRITA AGGARWAL",
//     ECode: "E14496",
//   }, {
//     Tname: "DR ALANKRITA AGGARWAL",
//     ECode: "E14496",
//   }, {
//     Tname: "DR MAHADEV",
//     ECode: "E13868",
//   }, {
//     Tname: "DR MAHADEV",
//     ECode: "E13868",
//   }, {
//     Tname: "DR SARITA SIMAIYA",
//     ECode: "E14422",
//   }, {
//     Tname: "DR SARITA SIMAIYA",
//     ECode: "E14422",
//   }, {
//     Tname: "DR SATINDERJIT KAUR",
//     ECode: "E15282",
//   }, {
//     Tname: "MR MUKESH BIRLA",
//     ECode: "E15063",
//   }, {
//     Tname: "MR MUKESH BIRLA",
//     ECode: "E15063",
//   }, {
//     Tname: "MR SIDDHARTH KUMAR",
//     ECode: "E12853",
//   }, {
//     Tname: "MS HARSHLEEN KAUR",
//     ECode: "E13419",
//   }, {
//     Tname: "MS HARSHLEEN KAUR",
//     ECode: "E13419",
//   }, {
//     Tname: "DR RAGHAV MEHRA",
//     ECode: "E16302",
//   }, {
//     Tname: "DR RAGHAV MEHRA",
//     ECode: "E16302",
//   }, {
//     Tname: "MS RAJAT TIWARI",
//     ECode: "E1172",
//   }, {
//     Tname: "MS SHUBHANGI",
//     ECode: "E13142",
//   }, {
//     Tname: "MS SHUBHANGI",
//     ECode: "E13142",
//   }, {
//     Tname: "MS SONALI KAPOOR",
//     ECode: "E15786",
//   }, {
//     Tname: "MS SONALI KAPOOR",
//     ECode: "E15786",
//   }, {
//     Tname: "MS TANVI",
//     ECode: "E15506",
//   }, {
//     Tname: "MS TANVI",
//     ECode: "E15506",
//   }, {
//     Tname: "MR JAGJIT SINGH",
//     ECode: "E15190",
//   }, {
//     Tname: "MS NEERU BALA",
//     ECode: "E13122",
//   }, {
//     Tname: "DR DEEPAK KUMAR",
//     ECode: "E11296",
//   }, {
//     Tname: "DR DEEPAK KUMAR",
//     ECode: "E11296",
//   }, {
//     Tname: "DR HARIHARAN",
//     ECode: "E11201",
//   }, {
//     Tname: "DR HARIHARAN",
//     ECode: "E11201",
//   }, {
//     Tname: "DR MADAN LAL SAINI",
//     ECode: "E13485",
//   }, {
//     Tname: "DR MADAN LAL SAINI",
//     ECode: "E13485",
//   }, {
//     Tname: "DR PREET KAMAL",
//     ECode: "E15857",
//   }, {
//     Tname: "DR SHIKHA GUPTA",
//     ECode: "E8741",
//   }, {
//     Tname: "MR HARMANJEET SINGH",
//     ECode: "E8042",
//   }, {
//     Tname: "DR DEEPAK KUMAR",
//     ECode: "E11296",
//   }, {
//     Tname: "DR DEEPAK KUMAR",
//     ECode: "E11296",
//   }, {
//     Tname: "DR PREET KAMAL",
//     ECode: "E15857",
//   }, {
//     Tname: "DR PREET KAMAL",
//     ECode: "E15857",
//   }, {
//     Tname: "MS LATA GUPTA",
//     ECode: "E13365",
//   }, {
//     Tname: "DR MADAN LAL SAINI",
//     ECode: "E13485",
//   }, {
//     Tname: "DR PREET KAMAL",
//     ECode: "E15857",
//   }, {
//     Tname: "MS PRAGATIE",
//     ECode: "E13244",
//   }, {
//     Tname: "MR HARMANJEET SINGH",
//     ECode: "E8042",
//   }, {
//     Tname: "DR HARIHARAN",
//     ECode: "E11201",
//   }, {
//     Tname: "DR HARIHARAN",
//     ECode: "E11201",
//   }, {
//     Tname: "DR MADAN LAL SAINI",
//     ECode: "E13485",
//   }, {
//     Tname: "MS RUKSANA",
//     ECode: "E16227",
//   }
// ];
// var notFound = 0;     
// for(const teacher of InternalTeacher){
//    if(teacher.ECode==='None'){
//     const words = teacher['Tname'].match(/\b(\w+)\b/g);
//     let s=""
//     if(words)
//     {
//         s =words[0];
//         for(let i = 1;i<words?.length;i++){
//         s+="&"+words?.at(i);
//     };}
//     console.log(s)
//     const res = await prisma.teacher.findFirst({
//         where:{
//             Tname:{
//                 search: s
//             }
//         }
//     })
//     if(res==null){
//         console.log(res);
//         teacher.ECode = 'None'
//         notFound++;
//     }
//     else{
//         teacher.ECode = res.ECode;
//     }}
// }
// console.log(notFound);
// console.log(InternalTeacher);
// const Internal = [{"Ccode":"22CSH-241","section":"22AML1/A","Teacher":"E15783"},{"Ccode":"22CSH-241","section":"22AML3/A","Teacher":"E13365"},{"Ccode":"22CSH-241","section":"22AML5/A","Teacher":"E13845"},{"Ccode":"22CSH-241","section":"22AML7/A","Teacher":"E11286"},{"Ccode":"22CSH-241","section":"22AML9/A","Teacher":"E15791"},{"Ccode":"22CSH-243","section":"22AML11/A","Teacher":"E13851"},{"Ccode":"22CSH-241","section":"22AML11/B","Teacher":"E11286"},{"Ccode":"22CSH-242","section":"22AML1/B","Teacher":"E15043"},{"Ccode":"22CSH-242","section":"22AML3/B","Teacher":"E15060"},{"Ccode":"22CSH-242","section":"22AML5/B","Teacher":"E15507"},{"Ccode":"22CSH-242","section":"22AML7/B","Teacher":"E16189"},{"Ccode":"22CSH-242","section":"22AML9/B","Teacher":"E15043"},{"Ccode":"22CSH-243","section":"22AML2/A","Teacher":"E16298"},{"Ccode":"22CSH-243","section":"22AML4/A","Teacher":"E12800"},{"Ccode":"22CSH-243","section":"22AML6/A","Teacher":"E13464"},{"Ccode":"22CSH-243","section":"22AML8/A","Teacher":"E13851"},{"Ccode":"22CSH-243","section":"22AML10/A","Teacher":"E13122"},{"Ccode":"22CSH-244","section":"22AML2/B","Teacher":"E13465"},{"Ccode":"22CSH-244","section":"22AML4/B","Teacher":"E13548"},{"Ccode":"22CSH-244","section":"22AML6/B","Teacher":"E15372"},{"Ccode":"22CSH-244","section":"22AML8/B","Teacher":"E16302"},{"Ccode":"22CSH-244","section":"22AML10/B","Teacher":"E15400"},{"Ccode":"22CSH-242","section":"22AML1/A","Teacher":"E15043"},{"Ccode":"22CSH-242","section":"22AML3/A","Teacher":"E15060"},{"Ccode":"22CSH-242","section":"22AML5/A","Teacher":"E15400"},{"Ccode":"22CSH-242","section":"22AML7/A","Teacher":"E16189"},{"Ccode":"22CSH-242","section":"22AML9/A","Teacher":"E15507"},{"Ccode":"22CSH-243","section":"22AML1/B","Teacher":"E16298"},{"Ccode":"22CSH-243","section":"22AML3/B","Teacher":"E12800"},{"Ccode":"22CSH-243","section":"22AML5/B","Teacher":"E13464"},{"Ccode":"22CSH-243","section":"22AML7/B","Teacher":"E13851"},{"Ccode":"22CSH-243","section":"22AML9/B","Teacher":"E13122"},{"Ccode":"22CSH-244","section":"22AML2/A","Teacher":"E13465"},{"Ccode":"22CSH-244","section":"22AML4/A","Teacher":"E13548"},{"Ccode":"22CSH-244","section":"22AML6/A","Teacher":"E12652"},{"Ccode":"22CSH-244","section":"22AML8/A","Teacher":"E16302"},{"Ccode":"22CSH-244","section":"22AML10/A","Teacher":"E15400"},{"Ccode":"22CSH-241","section":"22AML11/A","Teacher":"E15506"},{"Ccode":"22CSH-241","section":"22AML2/B","Teacher":"E15783"},{"Ccode":"22CSH-241","section":"22AML4/B","Teacher":"E13845"},{"Ccode":"22CSH-241","section":"22AML6/B","Teacher":"E13845"},{"Ccode":"22CSH-241","section":"22AML8/B","Teacher":"E11286"},{"Ccode":"22CSH-241","section":"22AML10/B","Teacher":"E15791"},{"Ccode":"22CSH-243","section":"22AML11/B","Teacher":"E8042"},{"Ccode":"22CSH-243","section":"22AML1/A","Teacher":"E16298"},{"Ccode":"22CSH-243","section":"22AML3/A","Teacher":"E12800"},{"Ccode":"22CSH-243","section":"22AML5/A","Teacher":"E13464"},{"Ccode":"22CSH-243","section":"22AML7/A","Teacher":"E13851"},{"Ccode":"22CSH-243","section":"22AML9/A","Teacher":"E13122"},{"Ccode":"22CSH-244","section":"22AML1/B","Teacher":"E13465"},{"Ccode":"22CSH-244","section":"22AML3/B","Teacher":"E13548"},{"Ccode":"22CSH-244","section":"22AML5/B","Teacher":"E15372"},{"Ccode":"22CSH-244","section":"22AML7/B","Teacher":"E15063"},{"Ccode":"22CSH-244","section":"22AML9/B","Teacher":"E8752"},{"Ccode":"22CSH-241","section":"22AML2/A","Teacher":"E15134"},{"Ccode":"22CSH-242","section":"22AML4/A","Teacher":"E11286"},{"Ccode":"22CSH-241","section":"22AML6/A","Teacher":"E13845"},{"Ccode":"22CSH-241","section":"22AML8/A","Teacher":"E16227"},{"Ccode":"22CSH-241","section":"22AML10/A","Teacher":"E15791"},{"Ccode":"22CSH-242","section":"22AML2/B","Teacher":"E15043"},{"Ccode":"22CSH-242","section":"22AML4/B","Teacher":"E15060"},{"Ccode":"22CSH-242","section":"22AML6/B","Teacher":"E16189"},{"Ccode":"22CSH-242","section":"22AML8/B","Teacher":"E16189"},{"Ccode":"22CSH-242","section":"22AML10/B","Teacher":"E15190"},{"Ccode":"22CSH-244","section":"22AML1/A","Teacher":"E13465"},{"Ccode":"22CSH-244","section":"22AML3/A","Teacher":"E13548"},{"Ccode":"22CSH-244","section":"22AML5/A","Teacher":"E12652"},{"Ccode":"22CSH-244","section":"22AML7/A","Teacher":"E13548"},{"Ccode":"22CSH-244","section":"22AML9/A","Teacher":"E13548"},{"Ccode":"22CSH-241","section":"22AML1/B","Teacher":"E13244"},{"Ccode":"22CSH-241","section":"22AML3/B","Teacher":"E13365"},{"Ccode":"22CSH-241","section":"22AML5/B","Teacher":"E13845"},{"Ccode":"22CSH-241","section":"22AML7/B","Teacher":"E11286"},{"Ccode":"22CSH-241","section":"22AML9/B","Teacher":"E15791"},{"Ccode":"22CSH-242","section":"22AML2/A","Teacher":"E15043"},{"Ccode":"22CSH-241","section":"22AML4/A","Teacher":"E14950"},{"Ccode":"22CSH-242","section":"22AML6/A","Teacher":"E15507"},{"Ccode":"22CSH-242","section":"22AML8/A","Teacher":"E16189"},{"Ccode":"22CSH-242","section":"22AML10/A","Teacher":"E15190"},{"Ccode":"22CSH-243","section":"22AML2/B","Teacher":"E16298"},{"Ccode":"22CSH-243","section":"22AML4/B","Teacher":"E13464"},{"Ccode":"22CSH-243","section":"22AML6/B","Teacher":"E13464"},{"Ccode":"22CSH-243","section":"22AML8/B","Teacher":"E13851"},{"Ccode":"22CSH-243","section":"22AML10/B","Teacher":"E13122"},{"Ccode":"22CSH-244","section":"22AML11/B","Teacher":"E15400"},{"Ccode":"22CSH-242","section":"22AML11/B","Teacher":"E15190"},{"Ccode":"22CSH-242","section":"22AML11/A","Teacher":"E15190"},{"Ccode":"22CSH-244","section":"22AML11/A","Teacher":"E15400"},{"Ccode":"21CSH-335","section":"21AML7/A","Teacher":"E13828"},{"Ccode":"21CSP-343","section":"21AML7/A","Teacher":"E14394"},{"Ccode":"21CSH-346","section":"21AML7/A","Teacher":"E13618"},{"Ccode":"21CSH-345","section":"21AML7/A","Teacher":"E14496"},{"Ccode":"21CSH-334","section":"21AML7/A","Teacher":"E13248"},{"Ccode":"21CSH-335","section":"21AML7/B","Teacher":"E13828"},{"Ccode":"21CSP-343","section":"21AML7/B","Teacher":"E14394"},{"Ccode":"21CSH-346","section":"21AML7/B","Teacher":"E13618"},{"Ccode":"21CSH-345","section":"21AML7/B","Teacher":"E14496"},{"Ccode":"21CSH-334","section":"21AML7/B","Teacher":"E13248"},{"Ccode":"21CSH-335","section":"21AML8/A","Teacher":"E13828"},{"Ccode":"21CSP-343","section":"21AML8/A","Teacher":"E16302"},{"Ccode":"21CSH-346","section":"21AML8/A","Teacher":"E13618"},{"Ccode":"21CSH-345","section":"21AML8/A","Teacher":"E13868"},{"Ccode":"21CSH-334","section":"21AML8/A","Teacher":"E13248"},{"Ccode":"21CSH-335","section":"21AML8/B","Teacher":"E15060"},{"Ccode":"21CSH-345","section":"21AML8/B","Teacher":"E13868"},{"Ccode":"21CSP-343","section":"21AML8/B","Teacher":"E16302"},{"Ccode":"21CSH-346","section":"21AML8/B","Teacher":"E13618"},{"Ccode":"21CSH-334","section":"21AML8/B","Teacher":"E13365"},{"Ccode":"21CSH-335","section":"21AML9/A","Teacher":"E15063"},{"Ccode":"21CSP-343","section":"21AML9/A","Teacher":"E14621"},{"Ccode":"21CSH-346","section":"21AML9/A","Teacher":"E13038"},{"Ccode":"21CSH-345","section":"21AML9/A","Teacher":"E12849"},{"Ccode":"21CSH-334","section":"21AML9/A","Teacher":"E13142"},{"Ccode":"21CSH-335","section":"21AML9/B","Teacher":"E11032"},{"Ccode":"21CSH-345","section":"21AML9/B","Teacher":"E15380"},{"Ccode":"21CSP-343","section":"21AML9/B","Teacher":"E14621"},{"Ccode":"21CSH-346","section":"21AML9/B","Teacher":"E15565"},{"Ccode":"21CSH-334","section":"21AML9/B","Teacher":"E13142"},{"Ccode":"21CSH-346","section":"21AML10/A","Teacher":"E13038"},{"Ccode":"21CSH-335","section":"21AML10/A","Teacher":"E15063"},{"Ccode":"21CSP-343","section":"21AML10/A","Teacher":"E14621"},{"Ccode":"21CSH-345","section":"21AML10/A","Teacher":"E12849"},{"Ccode":"21CSH-334","section":"21AML10/A","Teacher":"E14422"},{"Ccode":"21CSH-335","section":"21AML10/B","Teacher":"E16227"},{"Ccode":"21CSP-343","section":"21AML10/B","Teacher":"E14621"},{"Ccode":"21CSH-346","section":"21AML10/B","Teacher":"E15400"},{"Ccode":"21CSH-345","section":"21AML10/B","Teacher":"E12849"},{"Ccode":"21CSH-334","section":"21AML10/B","Teacher":"E14422"},{"Ccode":"21CSH-345","section":"21AML11/A","Teacher":"E12849"},{"Ccode":"21CSH-335","section":"21AML11/A","Teacher":"E15123"},{"Ccode":"21CSP-343","section":"21AML11/A","Teacher":"E14621"},{"Ccode":"21CSH-346","section":"21AML11/A","Teacher":"E12853"},{"Ccode":"21CSH-334","section":"21AML11/A","Teacher":"E13987"},{"Ccode":"21CSH-345","section":"21AML11/B","Teacher":"E12849"},{"Ccode":"21CSH-335","section":"21AML11/B","Teacher":"E15123"},{"Ccode":"21CSP-343","section":"21AML11/B","Teacher":"E14621"},{"Ccode":"21CSH-346","section":"21AML11/B","Teacher":"E12853"},{"Ccode":"21CSH-334","section":"21AML11/B","Teacher":"E13987"},{"Ccode":"21CSH-335","section":"21AML12/A","Teacher":"E15786"},{"Ccode":"21CSH-346","section":"21AML12/A","Teacher":"E16159"},{"Ccode":"21CSP-343","section":"21AML12/A","Teacher":"E12853"},{"Ccode":"21CSH-345","section":"21AML12/A","Teacher":"E12849"},{"Ccode":"21CSH-334","section":"21AML12/A","Teacher":"E13142"},{"Ccode":"21CSH-335","section":"21AML12/B","Teacher":"E13263"},{"Ccode":"21CSP-343","section":"21AML12/B","Teacher":"E12853"},{"Ccode":"21CSH-345","section":"21AML12/B","Teacher":"E16227"},{"Ccode":"21CSH-346","section":"21AML12/B","Teacher":"E16159"},{"Ccode":"21CSH-334","section":"21AML12/B","Teacher":"E13248"},{"Ccode":"21CSH-335","section":"21AML1/A","Teacher":"E15978"},{"Ccode":"21CSP-343","section":"21AML1/A","Teacher":"E13419"},{"Ccode":"21CSH-346","section":"21AML1/A","Teacher":"E12903"},{"Ccode":"21CSH-345","section":"21AML1/A","Teacher":"E14380"},{"Ccode":"21CSH-334","section":"21AML1/A","Teacher":"E1326"},{"Ccode":"21CSH-335","section":"21AML1/B","Teacher":"E15783"},{"Ccode":"21CSP-343","section":"21AML1/B","Teacher":"E13419"},{"Ccode":"21CSH-346","section":"21AML1/B","Teacher":"E15398"},{"Ccode":"21CSH-345","section":"21AML1/B","Teacher":"E14380"},{"Ccode":"21CSH-334","section":"21AML1/B","Teacher":"E15978"},{"Ccode":"21CSH-335","section":"21AML2/A","Teacher":"E15786"},{"Ccode":"21CSP-343","section":"21AML2/A","Teacher":"E10488"},{"Ccode":"21CSH-346","section":"21AML2/A","Teacher":"E1172"},{"Ccode":"21CSH-345","section":"21AML2/A","Teacher":"E16227"},{"Ccode":"21CSH-334","section":"21AML2/A","Teacher":"E13987"},{"Ccode":"21CSH-335","section":"21AML2/B","Teacher":"E15786"},{"Ccode":"21CSP-343","section":"21AML2/B","Teacher":"E15398"},{"Ccode":"21CSH-346","section":"21AML2/B","Teacher":"E1172"},{"Ccode":"21CSH-345","section":"21AML2/B","Teacher":"E16227"},{"Ccode":"21CSH-334","section":"21AML2/B","Teacher":"E13987"},{"Ccode":"21CSH-335","section":"21AML3/A","Teacher":"E13263"},{"Ccode":"21CSP-343","section":"21AML3/A","Teacher":"E14394"},{"Ccode":"21CSH-346","section":"21AML3/A","Teacher":"E16159"},{"Ccode":"21CSH-345","section":"21AML3/A","Teacher":"E15380"},{"Ccode":"21CSH-334","section":"21AML3/A","Teacher":"E15282"},{"Ccode":"21CSH-335","section":"21AML3/B","Teacher":"E13263"},{"Ccode":"21CSP-343","section":"21AML3/B","Teacher":"E14394"},{"Ccode":"21CSH-346","section":"21AML3/B","Teacher":"E12903"},{"Ccode":"21CSH-345","section":"21AML3/B","Teacher":"E15380"},{"Ccode":"21CSH-334","section":"21AML3/B","Teacher":"E15282"},{"Ccode":"21CSH-335","section":"21AML4/A","Teacher":"E13263"},{"Ccode":"21CSP-343","section":"21AML4/A","Teacher":"E14394"},{"Ccode":"21CSH-346","section":"21AML4/A","Teacher":"E15506"},{"Ccode":"21CSH-345","section":"21AML4/A","Teacher":"E15380"},{"Ccode":"21CSH-334","section":"21AML4/A","Teacher":"E15282"},{"Ccode":"21CSH-335","section":"21AML4/B","Teacher":"E13263"},{"Ccode":"21CSP-343","section":"21AML4/B","Teacher":"E14394"},{"Ccode":"21CSH-346","section":"21AML4/B","Teacher":"E15506"},{"Ccode":"21CSH-345","section":"21AML4/B","Teacher":"E15380"},{"Ccode":"21CSH-345","section":"21AML5/A","Teacher":"E14496"},{"Ccode":"21CSH-345","section":"21AML5/B","Teacher":"E14496"},{"Ccode":"21CSH-345","section":"21AML6/A","Teacher":"E13868"},{"Ccode":"21CSH-345","section":"21AML6/B","Teacher":"E13868"},{"Ccode":"21CSH-334","section":"21AML6/A","Teacher":"E14422"},{"Ccode":"21CSH-334","section":"21AML6/B","Teacher":"E14422"},{"Ccode":"21CSH-334","section":"21AML4/B","Teacher":"E15282"},{"Ccode":"21CSH-335","section":"21AML6/A","Teacher":"E15063"},{"Ccode":"21CSH-335","section":"21AML6/B","Teacher":"E15063"},{"Ccode":"21CSH-346","section":"21AML6/A","Teacher":"E12853"},{"Ccode":"21CSP-343","section":"21AML6/A","Teacher":"E13419"},{"Ccode":"21CSP-343","section":"21AML6/B","Teacher":"E13419"},{"Ccode":"21CSP-343","section":"21AML5/A","Teacher":"E16302"},{"Ccode":"21CSP-343","section":"21AML5/B","Teacher":"E16302"},{"Ccode":"21CSH-346","section":"21AML6/B","Teacher":"E1172"},{"Ccode":"21CSH-334","section":"21AML5/A","Teacher":"E13142"},{"Ccode":"21CSH-334","section":"21AML5/B","Teacher":"E13142"},{"Ccode":"21CSH-335","section":"21AML5/A","Teacher":"E15786"},{"Ccode":"21CSH-335","section":"21AML5/B","Teacher":"E15786"},{"Ccode":"21CSH-346","section":"21AML5/A","Teacher":"E15506"},{"Ccode":"21CSH-346","section":"21AML5/B","Teacher":"E15506"},{"Ccode":"20CSP-436","section":"20AML3/A","Teacher":"E15190"},{"Ccode":"20CSP-436","section":"20AML3/B","Teacher":"E13122"},{"Ccode":"20CSF-431","section":"20AML3/A","Teacher":"E11296"},{"Ccode":"20CSF-431","section":"20AML3/B","Teacher":"E11296"},{"Ccode":"20CSP-436","section":"20AML4/A","Teacher":"E11201"},{"Ccode":"20CSP-436","section":"20AML4/B","Teacher":"E11201"},{"Ccode":"20CSF-431","section":"20AML4/A","Teacher":"E13485"},{"Ccode":"20CSF-431","section":"20AML4/B","Teacher":"E13485"},{"Ccode":"20CSP-436","section":"20AML1/A","Teacher":"E15857"},{"Ccode":"20CSF-431","section":"20AML1/A","Teacher":"E8741"},{"Ccode":"20CSP-436","section":"20AML2/B","Teacher":"E8042"},{"Ccode":"20CSF-431","section":"20AML2/A","Teacher":"E11296"},{"Ccode":"20CSF-431","section":"20AML2/B","Teacher":"E11296"},{"Ccode":"20CSP-436","section":"20AML5/A","Teacher":"E15857"},{"Ccode":"20CSP-436","section":"20AML5/B","Teacher":"E15857"},{"Ccode":"20CSF-431","section":"20AML5/A","Teacher":"E13365"},{"Ccode":"20CSF-431","section":"20AML5/B","Teacher":"E13485"},{"Ccode":"20CSP-436","section":"20AML1/B","Teacher":"E15857"},{"Ccode":"20CSF-431","section":"20AML1/B","Teacher":"E13244"},{"Ccode":"20CSP-436","section":"20AML2/A","Teacher":"E8042"},{"Ccode":"20CSP-436","section":"20AML6/A","Teacher":"E11201"},{"Ccode":"20CSP-436","section":"20AML6/B","Teacher":"E11201"},{"Ccode":"20CSF-431","section":"20AML6/A","Teacher":"E13485"},{"Ccode":"20CSF-431","section":"20AML6/B","Teacher":"E16227"}];
// const Failed = [];
// for (const teacher of Internal){
//   console.log(teacher);
//   try{
//     await prisma.iTeacher.create({
//       data:teacher
//     });
//   }
//   catch(err){
//     Failed.push(teacher);
//   }
// }
// console.log(Failed);
//accesting internal teacher
// let res = (await prisma.section.findUnique({
//   where:{
//     id: "22AML1/A"
//   },
//   include:{
//     teacher: {
//       include:{
//         teacher:true
//       }
//     }
//   }
// }))
// if(res){for(const x of res['teacher']){
//   console.log(x);
// }}
// // labs
// const labs = [{'labNo': '207', 'capacity': 36, 'block': '14-D2'}, {'labNo': '306', 'capacity': 35, 'block': '14-D2'}, {'labNo': '307', 'capacity': 35, 'block': '14-D2'}, {'labNo': '308', 'capacity': 33, 'block': '14-D2'}, {'labNo': '317', 'capacity': 33, 'block': '14-D2'}, {'labNo': '318', 'capacity': 28, 'block': '14-D2'}, {'labNo': '408', 'capacity': 46, 'block': '14-D2'}, {'labNo': '409', 'capacity': 43, 'block': '14-D2'}, {'labNo': '410', 'capacity': 30, 'block': '14-D2'}, {'labNo': '411', 'capacity': 34, 'block': '14-D2'}, {'labNo': '412', 'capacity': 30, 'block': '14-D2'}, {'labNo': '413', 'capacity': 30, 'block': '14-D2'}, {'labNo': '414', 'capacity': 36, 'block': '14-D2'}, {'labNo': '415', 'capacity': 35, 'block': '14-D2'}, {'labNo': '416', 'capacity': 30, 'block': '14-D2'}, {'labNo': '508', 'capacity': 27, 'block': '14-D2'}, {'labNo': '512', 'capacity': 36, 'block': '14-D2'}, {'labNo': '513', 'capacity': 33, 'block': '14-D2'}, {'labNo': '514', 'capacity': 30, 'block': '14-D2'}, {'labNo': '101', 'capacity': 45, 'block': '12-D3'}, {'labNo': '209-A', 'capacity': 41, 'block': '12-D3'}, {'labNo': '209', 'capacity': 40, 'block': '12-D3'}, {'labNo': '210', 'capacity': 39, 'block': '12-D3'}, {'labNo': '211', 'capacity': 41, 'block': '12-D3'}, {'labNo': '101', 'capacity': 35, 'block': '11-D4'}, {'labNo': '102', 'capacity': 36, 'block': '11-D4'}, {'labNo': '103', 'capacity': 36, 'block': '11-D4'}, {'labNo': '104', 'capacity': 40, 'block': '11-D4'}, {'labNo': '106', 'capacity': 40, 'block': '11-D4'}]

// await prisma.rooms.createMany({
//     data: labs
// })

