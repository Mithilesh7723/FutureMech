const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "src", "data");
const FILE = path.join(DATA_DIR, "leads.json");

const names = [
  "Aarav Mehta", "Priya Sharma", "Rohan Gupta", "Neha Kapoor", "Vikram Singh",
  "Ananya Reddy", "Karthik Nair", "Deepa Iyer", "Sahil Joshi", "Pooja Verma",
  "Arjun Patel", "Kavya Rao", "Rahul Bose", "Meera Choudhary", "Aditya Kulkarni",
  "Shruti Malhotra", "Nikhil Saxena", "Divya Pillai", "Varun Chauhan", "Tanvi Deshmukh",
  "Manish Tiwari", "Sneha Rajput", "Gaurav Bhatia", "Ritu Agarwal", "Siddharth Jha",
  "Nisha Pandey", "Amit Chawla", "Pallavi Kulkarni", "Ravi Shankar", "Geeta Devi",
  "Suresh Kumar", "Usha Rani", "Prakash Yadav", "Sunita Menon", "Sanjay Mishra",
  "Rekha Singh", "Manoj Kumar", "Kamala Devi", "Ashok Banerjee", "Sarita Gupta",
  "Rajesh Verma", "Anjali Saxena", "Dinesh Chandra", "Madhuri Patil", "Vijay Sharma",
  "Lata Kulkarni", "Bharat Raj", "Suman Rao", "Krishna Prasad", "Lakshmi Nair"
];

const phones = [
  "9876543210", "9123456789", "9988776655", "8877665544", "7766554433",
  "6655443322", "9911223344", "8800991122", "7788990011", "6677889900",
  "5566778899", "9900112233", "8811223344", "7700112233", "6611223344",
  "5511223344", "9933445566", "8833445566", "7733445566", "6633445566",
  "5533445566", "9944556677", "8844556677", "7744556677", "6644556677",
  "5544556677", "9955667788", "8855667788", "7755667788", "6655667788",
  "5555667788", "9966778899", "8866778899", "7766778899", "6666778899",
  "5566778899", "9977889900", "8877889900", "7777889900", "6677889900",
  "5577889900", "9988990011", "8888990011", "7788990011", "6688990011",
  "5588990011", "9999001122", "8899001122", "7799001122", "6699001122"
];

const emails = names.map(n => {
  const parts = n.toLowerCase().split(" ");
  return `${parts[0]}.${parts[1]}@gmail.com`;
});

const services = [
  "battery-health-check", "battery-regeneration", "battery-diagnostics",
  "car-service", "doorstep-service", "fleet-maintenance", "pdi", "other"
];

const vehicles = [
  "Maruti Swift 2022", "Hyundai Creta 2023", "Tata Nexon 2021", "Mahindra XUV700 2023",
  "Toyota Innova 2020", "Honda City 2022", "Kia Seltos 2023", "MG Hector 2022",
  "Renault Kiger 2021", "Nissan Magnite 2022", "Ford EcoSport 2020", "Volkswagen Taigun 2023",
  "Skoda Kushaq 2022", "Hyundai Verna 2023", "Maruti Baleno 2022", "Tata Altroz 2021",
  "Toyota Fortuner 2023", "Mahindra Thar 2022", "Jeep Compass 2021", "Hyundai Tucson 2023",
  "BMW 3 Series 2022", "Audi A4 2021", "Mercedes C-Class 2023", "Tata Punch 2022",
  "Maruti WagonR 2020", "Hyundai i20 2022", "Tata Harrier 2023", "Kia Carens 2023",
  "Honda Amaze 2021", "Renault Triber 2022", "Toyota Camry 2023", "Skoda Slavia 2022",
  "Volkswagen Virtus 2023", "MG Astor 2022", "Maruti Ertiga 2021", "Hyundai Alcazar 2023",
  "Tata Safari 2022", "Mahindra Scorpio-N 2023", "Jeep Wrangler 2022", "Isuzu D-Max 2021",
  "Force Gurkha 2022", "Toyota Urban Cruiser 2021", "Maruti Jimny 2023", "Citroen C3 2022",
  "Honda Elevate 2023", "Hyundai Exter 2023", "Tata Nexon EV 2023", "Mahindra XUV400 2023",
  "MG Comet 2023", "BYD Atto 3 2023"
];

const messages = [
  "Need battery health check for my car. It's been 2 years since last service.",
  "My car battery dies frequently. Need urgent diagnosis.",
  "Looking for doorstep battery service in Jaipur.",
  "Fleet of 15 vehicles needs regular maintenance. Need a plan.",
  "Pre-delivery inspection required for new car purchase.",
  "Battery regeneration service needed. Car is 4 years old.",
  "Car won't start in the morning. Battery issue suspected.",
  "Need comprehensive diagnostics for used car purchase.",
  "Looking for reliable car service center in Malviya Nagar.",
  "Electric vehicle battery health check required.",
  "Fleet maintenance contract for corporate vehicles.",
  "Doorstep battery replacement for Hyundai Creta.",
  "Car AC not working properly. Need thorough diagnosis.",
  "Battery warning light is on. Need immediate inspection.",
  "Looking for annual maintenance contract for 5 cars.",
  "Pre-purchase inspection for a 2019 model car.",
  "Battery draining overnight. Need expert diagnosis.",
  "Regular service due for my Toyota Innova.",
  "Need PDI for a new Mahindra XUV700.",
  "Car making clicking noise when starting. Battery problem?",
  "Fleet of delivery vehicles needs battery checks.",
  "Looking for battery regeneration service near me.",
  "My car's AC compressor needs diagnosis.",
  "Need to check battery health before long road trip.",
  "Corporate fleet maintenance inquiry for 25 vehicles.",
  "Doorstep car service in Civil Lines area.",
  "Battery not holding charge. Need replacement advice.",
  "Looking for honest mechanic who diagnoses before recommending.",
  "Need comprehensive vehicle health report.",
  "Car electrical issues after recent rain.",
  "Fleet of taxis needs regular battery maintenance.",
  "Battery health check for a 2018 model car.",
  "Pre-delivery inspection for Toyota Fortuner.",
  "Car starting trouble in cold weather.",
  "Need diagnosis for hybrid vehicle battery.",
  "Regular maintenance for Honda City fleet.",
  "Looking for trusted car service in Raja Park.",
  "Battery replacement needed for Swift Dzire.",
  "Need urgent car diagnostics - brake issues.",
  "Fleet maintenance for Ola/Uber vehicles.",
  "Car suspension making noise. Need diagnosis.",
  "Battery check before selling my old car.",
  "Looking for doorstep PDI service.",
  "Comprehensive car health checkup needed.",
  "My mechanic recommended battery regeneration.",
  "Need digital vehicle health report for insurance.",
  "Fleet of 10 commercial vehicles needs servicing.",
  "Car engine light is on. Need proper diagnosis.",
  "Battery health check for EV hybrid vehicle.",
  "Looking for honest automotive care in Jaipur."
];

const statuses = ["new", "viewed", "contacted", "converted", "lost"];
const statusWeights = [0.3, 0.25, 0.2, 0.15, 0.1]; // 30% new, 25% viewed, etc.

function weightedStatus() {
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < statuses.length; i++) {
    cum += statusWeights[i];
    if (r <= cum) return statuses[i];
  }
  return "new";
}

function randomDate(daysBack) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  d.setHours(Math.floor(Math.random() * 14) + 8); // 8am - 10pm
  d.setMinutes(Math.floor(Math.random() * 60));
  return d.toISOString();
}

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const leads = [];
for (let i = 0; i < 50; i++) {
  const created = randomDate(60);
  leads.push({
    id: `seed${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}${i}`,
    name: names[i],
    phone: phones[i],
    email: emails[i],
    service: services[Math.floor(Math.random() * services.length)],
    vehicle: vehicles[i],
    message: messages[i],
    status: weightedStatus(),
    createdAt: created,
    updatedAt: created,
  });
}

fs.writeFileSync(FILE, JSON.stringify(leads, null, 2), "utf-8");
console.log(`Seeded ${leads.length} leads to ${FILE}`);