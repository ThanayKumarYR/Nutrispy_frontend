const exercises = [
    {
        "Name": "Running",
        "Description": "A cardiovascular exercise that involves running at a steady pace.",
        "Calories Burnt": 600,
        "Timings": "Morning",
        "Duration": "30 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Cycling",
        "Description": "An aerobic exercise performed on a bicycle.",
        "Calories Burnt": 500,
        "Timings": "Evening",
        "Duration": "45 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Swimming",
        "Description": "A full-body workout performed in water.",
        "Calories Burnt": 700,
        "Timings": "Afternoon",
        "Duration": "30 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Jump Rope",
        "Description": "A cardiovascular exercise using a skipping rope.",
        "Calories Burnt": 750,
        "Timings": "Morning",
        "Duration": "20 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Yoga",
        "Description": "A mind and body practice combining physical postures and breathing exercises.",
        "Calories Burnt": 300,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Pilates",
        "Description": "A low-impact exercise focusing on muscle strengthening and flexibility.",
        "Calories Burnt": 350,
        "Timings": "Afternoon",
        "Duration": "60 minutes",
        "Benefited Body Part": "Core"
    },
    {
        "Name": "Weightlifting",
        "Description": "A strength training exercise involving lifting weights.",
        "Calories Burnt": 400,
        "Timings": "Evening",
        "Duration": "45 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Hiking",
        "Description": "A long vigorous walk on trails or footpaths in the countryside.",
        "Calories Burnt": 550,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Rowing",
        "Description": "A full-body exercise using a rowing machine.",
        "Calories Burnt": 650,
        "Timings": "Morning",
        "Duration": "30 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Dancing",
        "Description": "A fun and dynamic cardiovascular exercise performed to music.",
        "Calories Burnt": 450,
        "Timings": "Evening",
        "Duration": "45 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Boxing",
        "Description": "A high-intensity workout involving punches and movements.",
        "Calories Burnt": 800,
        "Timings": "Afternoon",
        "Duration": "30 minutes",
        "Benefited Body Part": "Arms"
    },
    {
        "Name": "Tennis",
        "Description": "A racquet sport involving hitting a ball over a net.",
        "Calories Burnt": 600,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Basketball",
        "Description": "A team sport involving shooting a ball through a hoop.",
        "Calories Burnt": 650,
        "Timings": "Afternoon",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Soccer",
        "Description": "A team sport involving kicking a ball to score goals.",
        "Calories Burnt": 700,
        "Timings": "Evening",
        "Duration": "90 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Baseball",
        "Description": "A bat-and-ball game played between two teams.",
        "Calories Burnt": 350,
        "Timings": "Afternoon",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Martial Arts",
        "Description": "A combat practice involving various techniques and movements.",
        "Calories Burnt": 800,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Elliptical Trainer",
        "Description": "A low-impact cardio workout on an elliptical machine.",
        "Calories Burnt": 550,
        "Timings": "Morning",
        "Duration": "30 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Aerobics",
        "Description": "A form of exercise combining rhythmic aerobic exercise with stretching.",
        "Calories Burnt": 500,
        "Timings": "Afternoon",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Rock Climbing",
        "Description": "A sport involving climbing natural or artificial rock walls.",
        "Calories Burnt": 750,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Arms"
    },
    {
        "Name": "Skiing",
        "Description": "A sport involving gliding over snow on skis.",
        "Calories Burnt": 700,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Ashtanga Yoga",
        "Description": "A vigorous yoga practice involving a series of poses.",
        "Calories Burnt": 350,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Vinyasa Yoga",
        "Description": "A dynamic yoga practice linking movement and breath.",
        "Calories Burnt": 400,
        "Timings": "Afternoon",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Hatha Yoga",
        "Description": "A yoga practice focused on physical postures and breathing.",
        "Calories Burnt": 250,
        "Timings": "Evening",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Power Yoga",
        "Description": "A fast-paced yoga practice combining strength and flexibility.",
        "Calories Burnt": 500,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Hot Yoga",
        "Description": "A yoga practice performed in a heated room.",
        "Calories Burnt": 600,
        "Timings": "Afternoon",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Kundalini Yoga",
        "Description": "A yoga practice focusing on awakening the energy at the spine base.",
        "Calories Burnt": 300,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Bikram Yoga",
        "Description": "A series of 26 challenging yoga poses performed in a hot room.",
        "Calories Burnt": 500,
        "Timings": "Evening",
        "Duration": "90 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Iyengar Yoga",
        "Description": "A yoga form emphasizing precise alignment and use of props.",
        "Calories Burnt": 250,
        "Timings": "Afternoon",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Sivananda Yoga",
        "Description": "A traditional yoga practice focusing on relaxation and breathing.",
        "Calories Burnt": 200,
        "Timings": "Morning",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Yin Yoga",
        "Description": "A slow-paced yoga practice targeting deep connective tissues.",
        "Calories Burnt": 150,
        "Timings": "Evening",
        "Duration": "60 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Chair Pose",
        "Description": "A yoga pose that strengthens the thighs and buttocks.",
        "Calories Burnt": 200,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Downward Dog",
        "Description": "A foundational yoga pose stretching the entire body.",
        "Calories Burnt": 180,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Warrior Pose",
        "Description": "A yoga pose that builds strength and stability.",
        "Calories Burnt": 220,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Tree Pose",
        "Description": "A yoga pose that improves balance and focus.",
        "Calories Burnt": 170,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Plank Pose",
        "Description": "A yoga pose that strengthens the core and upper body.",
        "Calories Burnt": 210,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Core"
    },
    {
        "Name": "Child's Pose",
        "Description": "A resting yoga pose gently stretching the back and hips.",
        "Calories Burnt": 150,
        "Timings": "Evening",
        "Duration": "5 minutes",
        "Benefited Body Part": "Back"
    },
    {
        "Name": "Cobra Pose",
        "Description": "A yoga pose that strengthens the back and opens the chest.",
        "Calories Burnt": 160,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Back"
    },
    {
        "Name": "Seated Forward Bend",
        "Description": "A yoga pose that stretches the hamstrings and spine.",
        "Calories Burnt": 180,
        "Timings": "Evening",
        "Duration": "5 minutes",
        "Benefited Body Part": "Legs"
    },
    {
        "Name": "Bridge Pose",
        "Description": "A yoga pose that strengthens the back and glutes.",
        "Calories Burnt": 200,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Back"
    },
    {
        "Name": "Camel Pose",
        "Description": "A yoga pose that stretches the front of the body.",
        "Calories Burnt": 220,
        "Timings": "Afternoon",
        "Duration": "5 minutes",
        "Benefited Body Part": "Back"
    },
    {
        "Name": "Butterfly Pose",
        "Description": "A yoga pose that opens the hips and stretches the inner thighs.",
        "Calories Burnt": 150,
        "Timings": "Evening",
        "Duration": "5 minutes",
        "Benefited Body Part": "Hips"
    },
    {
        "Name": "Cat-Cow Pose",
        "Description": "A yoga sequence stretching and strengthening the spine.",
        "Calories Burnt": 170,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Spine"
    },
    {
        "Name": "Triangle Pose",
        "Description": "A yoga pose that stretches the sides of the body.",
        "Calories Burnt": 180,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Bow Pose",
        "Description": "A yoga pose that strengthens the back and improves posture.",
        "Calories Burnt": 200,
        "Timings": "Afternoon",
        "Duration": "5 minutes",
        "Benefited Body Part": "Back"
    },
    {
        "Name": "Half Moon Pose",
        "Description": "A yoga pose that improves balance and strengthens the core.",
        "Calories Burnt": 220,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Core"
    },
    {
        "Name": "Upward Facing Dog",
        "Description": "A yoga pose that strengthens the arms and back.",
        "Calories Burnt": 210,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Arms"
    },
    {
        "Name": "Reclining Hero Pose",
        "Description": "A yoga pose that stretches the thighs and improves flexibility.",
        "Calories Burnt": 160,
        "Timings": "Evening",
        "Duration": "5 minutes",
        "Benefited Body Part": "Thighs"
    },
    {
        "Name": "Boat Pose",
        "Description": "A yoga pose that strengthens the core and improves balance.",
        "Calories Burnt": 220,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Core"
    },
    {
        "Name": "Crow Pose",
        "Description": "A yoga pose that improves balance and strengthens the arms.",
        "Calories Burnt": 230,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Arms"
    },
    {
        "Name": "Pigeon Pose",
        "Description": "A yoga pose that opens the hips and stretches the thighs.",
        "Calories Burnt": 190,
        "Timings": "Evening",
        "Duration": "5 minutes",
        "Benefited Body Part": "Hips"
    },
    {
        "Name": "Fish Pose",
        "Description": "A yoga pose that stretches the front of the body.",
        "Calories Burnt": 180,
        "Timings": "Afternoon",
        "Duration": "5 minutes",
        "Benefited Body Part": "Back"
    },
    {
        "Name": "Lord of the Dance Pose",
        "Description": "A yoga pose that improves balance and stretches the front of the body.",
        "Calories Burnt": 200,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Full Body"
    },
    {
        "Name": "Lizard Pose",
        "Description": "A yoga pose that opens the hips and stretches the legs.",
        "Calories Burnt": 170,
        "Timings": "Evening",
        "Duration": "5 minutes",
        "Benefited Body Part": "Hips"
    },
    {
        "Name": "King Pigeon Pose",
        "Description": "A yoga pose that deepens the hip stretch and improves flexibility.",
        "Calories Burnt": 190,
        "Timings": "Afternoon",
        "Duration": "5 minutes",
        "Benefited Body Part": "Hips"
    },
    {
        "Name": "Headstand",
        "Description": "A yoga inversion pose improving balance and strengthening the core.",
        "Calories Burnt": 250,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Core"
    },
    {
        "Name": "Shoulder Stand",
        "Description": "A yoga inversion pose improving circulation and strengthening the shoulders.",
        "Calories Burnt": 230,
        "Timings": "Evening",
        "Duration": "5 minutes",
        "Benefited Body Part": "Shoulders"
    },
    {
        "Name": "Plow Pose",
        "Description": "A yoga inversion pose stretching the spine and shoulders.",
        "Calories Burnt": 220,
        "Timings": "Afternoon",
        "Duration": "5 minutes",
        "Benefited Body Part": "Spine"
    },
    {
        "Name": "Side Plank Pose",
        "Description": "A yoga pose strengthening the core and improving balance.",
        "Calories Burnt": 210,
        "Timings": "Morning",
        "Duration": "5 minutes",
        "Benefited Body Part": "Core"
    }
]

export default exercises;
