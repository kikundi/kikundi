// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/kikundi', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: 'Nicklaus Kling',
    password:
      '$2b$10$NTTjY1Wm7cHqVOb71ljODO1v3JcjnxWsvkShOU41F7F74SLRsBD.6',
    email: 'Raven.Spinka61@yahoo.com'
  },
  {
    username: 'Jovanny Price',
    password:
      '$2b$10$i0ou2kP88l2/o0KHqQWTZOMjab5LsoCmj0R.n3.cI2O/MbsZZ856O',
    email: 'Sherman37@yahoo.com'
  },
  {
    username: 'Shawn Dietrich',
    password:
      '$2b$10$Wk.UIhVfHEVcegt6G3CSUufx6FIM/zHZGztCzW1IIE5aSQxvwJBKu',
    email: 'Allan_Mante@yahoo.com'
  },
  {
    username: 'Wanda Jaskolski',
    password:
      '$2b$10$CLNITUFzGR7iMk3qUrQiO.n5AE9kWuyQMU7HXWmNmkf9q7tf72vAS',
    email: 'Nikki_Parker@hotmail.com'
  },
  {
    username: 'Vern Wilkinson',
    password:
      '$2b$10$RtsshW5/VQxeTvstcbolzeLwwu6oL5eL9cdsHLR4hDiugSybBeFz6',
    email: 'Zaria44@yahoo.com'
  },
  {
    username: 'Angelica Kuvalis',
    password:
      '$2b$10$BSdTlgvckn/LKG4ZdjDLIeLsh0Rt5vEiZWP65KhU3EQVmMvUxnFIK',
    email: 'Janis.Grimes@yahoo.com'
  },
  {
    username: 'Lessie Murazik',
    password:
      '$2b$10$EGae2qZUykpb0w2Z5nZmJeEZBZUYAKF3bl0JXBFIyhvHg.5o3VAES',
    email: 'Kayley_Stroman97@hotmail.com'
  },
  {
    username: 'Howard Treutel',
    password:
      '$2b$10$kLUCC0wrdbexxFGJmaNOdOqGvJu9PikeEPH3dbZ7T1VZCJeB4wdDi',
    email: 'Franco99@gmail.com'
  },
  {
    username: 'Damian Maggio',
    password:
      '$2b$10$t88b5EN6tYBIwTh67zfW4ueR8bhqmUvU0sHn/C0frzsnI9JCqDgCi',
    email: 'Garrick_Wiegand29@yahoo.com'
  },
  {
    username: 'Naomie Harris',
    password:
      '$2b$10$DXXRXQJj4Y.yA9EyCm6m4OzaVU7izlV7z6R1lRAbgVeUIPeBkl5s6',
    email: 'Dora_Walter8@gmail.com'
  },
  {
    username: 'Chanelle Pollich IV',
    password:
      '$2b$10$2xRA3zu7M9pL93/VrysWsufvKvXRMlGSp6uZPRUStmKa.WMMPi3dK',
    email: 'Janae.Ankunding@yahoo.com'
  },
  {
    username: 'Stacy Vandervort',
    password:
      '$2b$10$1lpzlVOjq/nzgxfNb7KlRusB7S.jiUchlYO5RnqtpokUhBKhcnsMa',
    email: 'Paula_Towne53@yahoo.com'
  },
  {
    username: 'Amber Mann',
    password:
      '$2b$10$SsxX8qZDdpOYxAT6/di4NOJDoWYrzfGlwz4SDeBaMt/B60pzOf1ze',
    email: 'Eladio.Weissnat@gmail.com'
  },
  {
    username: 'Zachariah Mosciski',
    password:
      '$2b$10$7Fi5bgxLOlJ/mu0yGm1oR.gIbk6Jb2siVX0LVZS85hTonie86Fq9a',
    email: 'Rosalind24@hotmail.com'
  },
  {
    username: 'Mr. Allison Kemmer',
    password:
      '$2b$10$jP9CDrBBED41gGLaoByiT.cD8c/IUADuO8d/LVEs8WOyf8BRJ.QRW',
    email: 'Greg91@yahoo.com'
  },
  {
    username: 'Hettie Rippin',
    password:
      '$2b$10$ExJZH3CmKCNgx3ix4.cILu/bPtPaGW87bEQcdmLl1M2Hvv2Y7TfKu',
    email: 'Elmo_Fay@hotmail.com'
  },
  {
    username: 'Tyrel Marvin',
    password:
      '$2b$10$c4pwyKFSoCpXct2N3uDyBuJhqqRBdy3KOnp/JzWCQRiE22nzmWw5G',
    email: 'Effie_Bernhard62@hotmail.com'
  },
  {
    username: 'Terrance Davis',
    password:
      '$2b$10$7sB20fuCZ4/RG2yVlXWRL.Ua5r/fJRtDOapfE2HzsaTrejWLvEogK',
    email: 'Werner.Haley@gmail.com'
  },
  {
    username: 'Dr. Johnathan Littel',
    password:
      '$2b$10$8uTQUHB9rdsIRiMqorkuY.6/boqO7HYZ1//fvSCGl78G2oK3EiKZW',
    email: 'Destini.Kuhn17@yahoo.com'
  },
  {
    username: 'Melody Gerlach',
    password:
      '$2b$10$A4HPxHp5ytf81yNfX58rW.jrI59GJQDr72vj7dLb02gC1DJ3qbeEm',
    email: 'Rickie_Kuhic58@gmail.com'
  },
  {
    username: 'Noelia Halvorson',
    password:
      '$2b$10$3U2I7hD0EB0/pcyIK5zg..2puyf69neFR9aZ3ftm1Jw4ML.Ud5oSy',
    email: 'Janet_Emard53@hotmail.com'
  },
  {
    username: 'Mr. Nona Kshlerin',
    password:
      '$2b$10$SSldsEwOQHTDhkFSF.7Zfed10aadT7dW7NCnDqnd/sT7F5IFv8w7K',
    email: 'Ernest_Hane@yahoo.com'
  },
  {
    username: 'Lonzo Hudson',
    password:
      '$2b$10$TGCU.cNwy8VHPv05cguqtO5q8QqX6Df1UcaOWZ1lMTuhI6SKaBlEK',
    email: 'Felicity2@hotmail.com'
  },
  {
    username: 'Estefania Dare',
    password:
      '$2b$10$uB3FFxkyNGln/QaQE1sf/.owPswQNLcBA81IcnuoAFLLUqAaHHphO',
    email: 'Cristian.Mitchell24@gmail.com'
  },
  {
    username: 'Daija Gulgowski',
    password:
      '$2b$10$WEyjVKPBdQYW2D0mIjXRA.tFoy9rystR4DJJf73uy6rtHhetP8MAy',
    email: 'Howell67@hotmail.com'
  },
  {
    username: 'Hilario Hauck I',
    password:
      '$2b$10$EorTxjLk8oNwozNq14IOJO9iv95T30oV.7uHblX.nlMw2vk6viNQW',
    email: 'Vada73@yahoo.com'
  },
  {
    username: 'Cassandre Heathcote',
    password:
      '$2b$10$pBCfReWGIjvaHXhBQ/o6B.GemJr/0.PdWWWAYkBJEdBmQnWcQNsva',
    email: 'Delphia_Mitchell79@yahoo.com'
  },
  {
    username: 'Bernhard Mann',
    password:
      '$2b$10$8OCBQhM9cZilLKypEVbVDuKCWgkG6mMfD82DUs/aHBeN40TXld0Zm',
    email: 'Kailey_Torp8@hotmail.com'
  },
  {
    username: 'Michaela Ebert',
    password:
      '$2b$10$yGVc8QixUgkbmIBhN5qDLO.OSvGuxvukxl8JCE9AEa2bZ29Wz8.Xm',
    email: 'Mohammad.Kessler@yahoo.com'
  },
  {
    username: 'Courtney Herman V',
    password:
      '$2b$10$84j4REwihwINxUJKuy1E..bhqL6wGBDYiPsyBqI3F2JdueE5mTJVW',
    email: 'Julian.Spencer39@gmail.com'
  },
  {
    username: 'Jedidiah Glover',
    password:
      '$2b$10$X/c08NpxqFdPFDgvOWFnIeAensskTz.Y6.LRuC6CjI20R4LRIPp42',
    email: 'Liam_Hammes@yahoo.com'
  },
  {
    username: 'Miss Javon Reynolds',
    password:
      '$2b$10$ggFOzYRkdnOzeeYB8rBJvuLyPd9rpaoPKkBi/kh3TIfrU6nbc1PlK',
    email: 'Darryl.Gleason@yahoo.com'
  },
  {
    username: 'Alan Purdy',
    password:
      '$2b$10$YHcqF4iiL/UfU8AmMXJhm.JImyJq0l0mu6k1B1L4YMJp9miryfwI6',
    email: 'River.Prosacco@yahoo.com'
  },
  {
    username: 'Troy Donnelly',
    password:
      '$2b$10$lFbGjhnEcoJQ3qj.uZNAouJJ8eGjK1fsfsnnSsqYctfcBCZHB0oTm',
    email: 'Marta.Heaney77@yahoo.com'
  },
  {
    username: 'Mr. Leone Stoltenberg',
    password:
      '$2b$10$IIziuVLADrf/6XOSTM5sOe65sTPTVS6TR5astP2H9B/V1G6tBVmTS',
    email: 'Ronny.Littel16@hotmail.com'
  },
  {
    username: 'Carolina Murphy DVM',
    password:
      '$2b$10$HNER1fa41o.GGkLpyutrdOiJPtCs6guRWO5G/Nxfestqs.tYaOl9a',
    email: 'Daren_Orn@hotmail.com'
  },
  {
    username: 'Jakayla Lubowitz',
    password:
      '$2b$10$V14mwUCe54hD7FN6UuQw6OwVzRk3ZdSdyzFyg4ESceYyIiumgi.w2',
    email: 'Kassandra_Corkery@gmail.com'
  },
  {
    username: 'Baylee Sporer',
    password:
      '$2b$10$rFUsOn0eDjrfaVdp/iH2VurQ5tgb1sifm9GdP2rYlfr.cOWeHqEAi',
    email: 'Ford80@hotmail.com'
  },
  {
    username: 'Ines Parisian',
    password:
      '$2b$10$yP7BHDphYfoOcJfW0n.XgeDWu5ddbFPJlHtLFGYbhBGO3iWmBKvTG',
    email: 'Dariana.Kilback94@gmail.com'
  },
  {
    username: 'Rosa Hermann',
    password:
      '$2b$10$GCOvtCHEckho30Y3B46EseDPq0s38aCK8yWYn1TeOGmikHMPN6DbC',
    email: 'Orlo81@gmail.com'
  },
  {
    username: 'Charlie Miller',
    password:
      '$2b$10$CB88mfNM2x/PB1f1KeSUiOZgIOvKJpvRHCTpMqGfYMYO1FfS4Isf2',
    email: 'Waylon_Bradtke@yahoo.com'
  },
  {
    username: 'Miss Antonio Bednar',
    password:
      '$2b$10$8TWswgDFmdINVKctgapTOu3Liiq1RbvY.ujZJ.3mH2ZACrO3hw1Em',
    email: 'Camryn.Gorczany19@hotmail.com'
  },
  {
    username: 'Jonathan Waelchi',
    password:
      '$2b$10$V2Z5PDW6HhtcvjwUmpvrc.d.tt1j2rY/0Xnc2Cm.tezd53zUA0r0K',
    email: 'Juston.Kuhn@yahoo.com'
  },
  {
    username: 'Miss Roosevelt Paucek',
    password:
      '$2b$10$IaDL8lSJhwOEuUj2AJjUNeaRRULpaDjJhy5TGHuejGr6Ac09Hrf2S',
    email: 'Pasquale.Rogahn@gmail.com'
  },
  {
    username: 'Marianne Kreiger',
    password:
      '$2b$10$sQ2S0MkA5adT7LAs/lR0VehpbTAiIZd3xdulOdlQkHLdK8VJfLk7u',
    email: 'Lolita.McKenzie@gmail.com'
  },
  {
    username: 'Tyree Rolfson MD',
    password:
      '$2b$10$mC5lBZl0Hd2VxXJJQ3OZ0Oba072TLG1.a9xmSw/i6Djm.x3mZluiG',
    email: 'Reynold.Abbott65@hotmail.com'
  },
  {
    username: 'Mr. Jabari Okuneva',
    password:
      '$2b$10$F7dJyBmIqilPWFM8X40thup5Mof76NqpE8/oiUSQAWG5IsDg9LkPu',
    email: 'Tiara_Gleichner@yahoo.com'
  },
  {
    username: 'Mr. Derick Gleichner',
    password:
      '$2b$10$UUzRjqavd33tX2.7ZpBjLOcj90zekmOLxiBVvOOkHbkCkC.8aLA66',
    email: 'Wade_Fadel@yahoo.com'
  },
  {
    username: 'Adan Brown',
    password:
      '$2b$10$pJOHg.l.WF5CkUWPaqFQr.O/AUKuvsuws/Lycapa1QpH6iyQsoZsW',
    email: 'Annette.Kertzmann65@yahoo.com'
  },
  {
    username: 'Dereck Ferry MD',
    password:
      '$2b$10$CYcYbj2BRa3Z9VifhxlwTexNfWQ5QpLJcr82c5ku2TUI2iaLYcrqC',
    email: 'Roselyn32@yahoo.com'
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })