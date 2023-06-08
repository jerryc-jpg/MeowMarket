const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem  = require('./LineItem');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, admin, marge, homer,tunnel] = await Promise.all([
    User.create({ username: 'moe', password: '123', email: 'moe@gmail.com' }),
    User.create({ username: 'lucy', password: '123', email: 'lucy@gmail.com' }),
    User.create({ username: 'larry', password: '123', email: 'larry@gmail.com' }),
    User.create({ username: 'admin', password: '123', isAdmin: true }),
    Product.create({ 
      productType: 'cat', 
      name: 'Marge',
      images:[
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849147/1/?bust=1685903009&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849147/3/?bust=1685903065&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849147/2/?bust=1685903024&width=1080",
      ],
      price:113, 
      age: 1,
      breed:'Torbie & Domestic Short Hair Mix',
      description: "While many know Marge as the mom on the animated series \"The Simpsons\", most do not know that she was once an avid disciple of Gandhi. Because of her disciplined approach to mindful meditation and her grounded philosophy on life, she has garnered a following of her own and has become somewhat of a guru herself in the spiritual community. Nicknamed by Gandhi himself, as \"the most chill kitten ever\", Marge prefers her simple nickname given to her by her siblings: Margie-moo.\n\nDespite her sudden rise to fame and quick ascent to critically acclaimed bestseller of books in the spiritual self-help genre, Marge is unbothered by fame and continues to practice meditation, afternoon naps, and sunbathing.\n\nLiving up to her nickname as the most chill kitten ever, Marge loves to cuddle on your lap, cuddle with her siblings, and play. We always prefer the kittens to be adopted out in pairs since they're still so young, have grown up together, and need the companionship of another kitten to help their development. She gets along with all her siblings and would like to be adopted with any one of the other Simpsons bunch: Homer, Bart, Lisa, or Maggie."}),
    Product.create({ 
      productType: 'cat', 
      name: 'Homer', 
      images:[
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849453/3/?bust=1685904397&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849453/1/?bust=1685904396&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849453/2/?bust=1685904455&width=1080"
      ],
      price:113, 
      age: 1,
      breed:'Domestic Short Hair Mix ',
      description: "While Homer is best known for his role of the father on the \"Simpsons\", many do not know he was also a famous operatic singer in his past life and demonstrates his vocal technique when he is hungry, or to let you know when unwanted flies are in the home and that he will go chase them down for you.\n\nHomer did qualify for the 2020 Olympics in the sport of \"interactive-cat-toy-with-feather hunting\" but has chosen to remain a house cat and pursue this sport as a side hobby instead. If you bring out an interactive cat toy with a feather however, you may be lucky enough to witness his competitive, winning hunting moves.\n\nMost of all, Homer loves to cuddle on your lap, with his siblings, and to play. We always prefer the kittens to be adopted out in pairs, since they're still so young, have grown up together, and need the companionship of another kitten to help their development. Homer gets along with all his siblings and would like to be adopted with any one of the other Simpsons bunch: Bart, Marge, Lisa or Maggie."}),
    Product.create({ 
      productType: 'accessory', 
      imgUrl: [
        "https://image.chewy.com/is/image/catalog/166382_MAIN._AC_SL1200_V1668737518_.jpg",
        "https://image.chewy.com/is/image/catalog/166382_PT2._AC_SL1200_V1682976333_.jpg"
      ],
      quantity: 15,
      name: 'Frisco Foldable Play Tri-Tunnel Cat Toy, Colorful', 
      price:11.35,  
      description:'Get ready for some pop-up fun with your kitty with this colorful, pop-open play tunnel from Frisco by Chewy. Every cat loves exploring a tunnel, so give your feline all the fun and feels of spending the day as a furry cave explorer. Just pop it open and then fold it down when you need to store it. Cats also love hiding and napping inside it, so you might want to leave it around so they always have the option of tucking in for a nap.'}),
    Product.create({ 
      productType: 'cat', 
      name: 'Lisa', 
      images:[
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849348/3/?bust=1685903457&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849348/1/?bust=1685903454&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849348/3/?bust=1685903457&width=1080"
      ],
      price:113, 
      age: 1,
      breed:'Tabby & Domestic Short Hair Mix',
      description:"Lisa, also known as Lisa Lovebug, is one of the kittens from the \"Simpsons\" litter. Multitalented, Lisa was trained from a young age as a metalsmith, but has a fine appreciation for all types of metal arts, including jewelry design. While she used to be a consultant designer at Cartier and spent a few years working for Rolex, she has now taken her talents to Kitten Rescue, where she admires and plays with anything shiny and metal. She will likely sit right in your lap upon meeting you and start grooming your hand immediately. Lisa shows her love each morning by waking you up with some licks and letting you know she is ready to eat!\n\nLisa loves to cuddle on your lap, with her siblings, and play. We always prefer the kittens to be adopted out in pairs, since they're still so young, have grown up together, and need the companionship of another kitten to help their development. She gets along with all her siblings and would like to be adopted with any one of the other Simpsons bunch: Homer, Bart, Marge or Maggie."}),
    Product.create({ 
      productType: 'cat', 
      name: 'Maggie', 
      images:[
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849146/2/?bust=1685903008&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849146/1/?bust=1685903008&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849146/3/?bust=1685903092&width=1080'
      ],
      age: 1,
      price:113, 
      breed:'Torbie & Domestic Short Hair Mix',
      description:"Maggie, known for her portrayal of the baby on the animated classic \"The Simpsons\", has brought her stardom to Kitten Rescue and is ready to be adopted! The runt of the \"Simpsons\" litter, Maggie is the littlest baby of the bunch. What many do not know about her, is in a past life, she was a V8 Ferrari Engine, and likes to demonstrate this with her constant purring.\n\nMaggie, a.k.a. Maggie Moo, is a very sweet and gentle kitten. While shy at first, once she warms up, she will want all the pets and snuggles. A true little sister, Maggie loves to follow her brothers and sisters around to play and cuddle!\n\nWe always prefer the kittens to be adopted out in pairs, since they're still so young, have grown up together, and need the companionship of another kitten to help their development. She gets along with all her siblings and would like to be adopted with any one of the other Simpsons bunch: Homer, Bart, Marge or Lisa, though she is most bonded with Bart."}),
    Product.create({ 
      productType: 'cat', 
      name: 'Bart', 
      images:[
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64848945/1/?bust=1685901615&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64848945/3/?bust=1685901619&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64848945/2/?bust=1685901619&width=1080'
      ],
      price:113, 
      age: 1,
      breed:'Tabby & Domestic Short Hair Mix',
      description:"Bart, known to his fans as Bartholamew or Bartimus the third, was once a squeak toy. However, he has decided to pursue his lifelong dream of being a house cat instead. If you're lucky though, you will hear the remnants of his past life in the form of his tiny, sweet squeaks.\n\nOften mistaken for a teddy bear, Bart loves to cuddle and constantly be in your lap. If he had it his way, he would be carried around like a baby the whole day. Upon being picked up, he transforms into a rag doll and calmly flops around happily in your arms.\n\nBart loves to cuddle on your lap, with his siblings, and play. We always prefer the kittens to be adopted out in pairs, since they're still so young, have grown up together, and need the companionship of another kitten to help their development. He gets along with all his siblings and would like to be adopted with any one of the other Simpsons bunch: Homer, Marge, Lisa or Maggie, though he is most bonded with Maggie."}),
    Product.create({ 
      productType: 'cat', 
      name: 'Ellen', 
      images:[
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57428659/1/?bust=1685743719&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57428659/3/?bust=1686107976&width=1080'
      ],
      age: 8,
      price:113, 
      breed:'Snowshoe & Siamese Mix',
      description:"Ellen is a pretty funky cat. She likes to lay around and just hang out all day. She is an older cat, so she's not too huge on toys or being held a lot. She likes to find really dark areas to hide out in until there isn't a lot going on. Unfortunately, Ellen doesn't have many teeth left, so she loves her wet food! \n\nEven though she is one of the most gorgeous cats we've had, she's just not your social butterfly. She likes to hide away and keep to herself when given the chance. With her lack of teeth and not so friendly demeanor, she's proven to be a difficult cat to adopt. All Ellen really needs is a loving home with people that have the time and patience to acclimate a scared, older cat. Does that sound like you?"}),
    Product.create({ 
      productType: 'cat', 
      name: 'Morticia', 
      images:['https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52521655/1/?bust=1685943604&width=1080'],
      price:113, 
      age: 2,
      breed:'Munchkin & Domestic Short Hair Mix',
      description:"Hi, My name is Morticia! I'm an about 2-year-old female munchkin/ domestic shorthair mix. I weigh roughly 7 lbs right now and won't grow anymore. I am spayed and fully vaccinated. I lived outside under my foster mom's house since I was born, so adjusting to living in a house is hard for me. Don't worry, I don't tear anything up or pee all over (I am fully box trained!!) but I am very fearful of people. I do love food though so my foster moms have been able to win me over with treats and food. So far I don't love to cuddle and haven't learned to show affection yet and have been so focused on helping care for my babies and grandbabies that I haven't started playing yet."}),
    Product.create({ 
      productType: 'cat', 
      name: 'Fiona', 
      images:[
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60652076/1/?bust=1685721039&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60652076/2/?bust=1685721039&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60652076/3/?bust=1685721039&width=1080'
      ],
      price:113, 
      age: 7,
      breed:'Tabby & Domestic Short Hair Mix',
      description:"Fiona was recently found with her deceased owner and sent to the shelter; they contacted us and she was reunited with her original foster.She is a very affectionate and well-behaved soul; a chubbette in beautiful condition, with lovely soft fur and lovely, huge sad green eyes like a Keane painting. After much love from her foster, she is finally healing from her trauma, and has become playful, friendly, and confident. She loves aggressive scritches, full body kitty massages, snuggling at bedtime, and greeting you in the morning with smiles, purrs, and a breath check.Fiona likes to be the queen of her domain, so she will need to be an only kitty. You will fall in love with this girl"}),
    Product.create({ 
      productType: 'cat', 
      name: 'Prairie', 
      images:['https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64447970/1/?bust=1684179102&width=1080'],
      price:113, 
      breed:'Dilute Calico',
      age: 3,
      description:"Prairie was trapped with her , mom, dad, bother and sisters july 4th weekend 2021. She and siblings were about 6 weeks and feral. They’ve slowly come around over 2 years but will require someone with extreme patience. Prairie is still the most timid of the bunch. "}),
    Product.create({ 
      productType: 'accessory', 
      images:[
        "https://image.chewy.com/is/image/catalog/777974_MAIN._AC_SL1200_V1676565789_.jpg",
        "https://image.chewy.com/is/image/catalog/777974_PT1._AC_SL1200_V1676653965_.jpg"
      ],
      name: 'Raw Paws Compressed Catnip Ball Cat Toy, 6 count' , 
      price:14.99,  
      quantity: 6,
      description:'Give your kitty the catnip she craves! Raw Paws Compressed Catnip Ball Cat Toy is made with 100% natural, fully digestible catnip with no preservatives, chemicals or toxins. When your favorite feline smells the solid catnip ball, it acts as a stimulant that encourages her to exercise and play. But when she licks and ingests it, the ball becomes a sedative that calms and relaxes her, melting away her stress. The compressed, purr-fectly safe to eat, catnip ball can also serve as a digestive aid reducing discomfort and helping your fur-iend feel her best.'}),
     Product.create({ 
      productType: 'accessory', 
      images: [
        "https://image.chewy.com/is/image/catalog/282263_MAIN._AC_SL1200_V1636497397_.jpg",
        "https://image.chewy.com/is/image/catalog/282263_PT1._AC_SL1200_V1636506120_.jpg",
      ],
      name: 'Squeak Squeak Mouse Cat Toy', 
      price:14.99,  
      quantity: 20,
      description:'If your cat is a born mouser but your home is mouse-free (which is good), she’ll love the Petstages Squeak Squeak Mouse Cat Toy. This toy has the look and feel of a real mouse, with detailed embroidery and faux fur to excite and encourage your cat to play. The touch-activated squeaker goes off for one second before turning off automatically, and this toy is sized for easy carrying and batting.'}),
    Product.create({ 
      productType: 'accessory', 
      images:[
        "https://image.chewy.com/is/image/catalog/556182_MAIN._AC_SL1200_V1677530963_.jpg",
        "https://image.chewy.com/is/image/catalog/556182_PT4._AC_SL1200_V1675714036_.jpg"
      ],
      name: 'Frisco Blue Ocean Waves 30 + UPF Dog & Cat Beach Cap', 
      price:15.99, 
      quantity: 10, 
      description:'Don’t let the sun harsh your pal’s warm-weather mellow. Keep their head protected from 98% of the sun’s harmful UV rays with Frisco by Chewy’s 30+ UPF beach cap. The polyester fabric and wide brim block direct sunlight, offering protection without cramping their style. The lightweight polyester/spandex fabric helps keep them cool, and the adjustable toggle makes it easy to secure so it won’t fall off while they frolic through the surf.'}),
    Product.create({ 
      productType: 'accessory', 
      images:[
        "https://image.chewy.com/is/image/catalog/213910_MAIN._AC_SL1200_V1590069698_.jpg",
        "https://image.chewy.com/is/image/catalog/213910_PT1._AC_SL1200_V1597156859_.jpg"
      ],
      name: 'Frisco Sushi Plush Cat Toy with Catnip, Small, 4 count', 
      price:5.42,  
      quantity: 15,
      description:'If there’s one food your cat would love to try, it’s probably some delicious sushi. Get them a little taste of those forbidden foods with the Frisco Plush Sushi Cat Toy with Catnip. This four pack of plush toys includes three different sushi rolls and a tasty wasabi packet, covered in soft fabric that’s great for batting, clawing and biting. And these toys are stuffed with enticing catnip to keep your cat coming back to play again and again. Bring out your furry friend’s inner foodie with these toys!'}),
    Product.create({ 
      productType: 'accessory', 
      images:["https://image.chewy.com/is/image/catalog/161805_MAIN._AC_SL1200_V1565736429_.jpg"],
      name: 'Frisco Butterfly Cat Tracks Cat Toy', 
      price: 10.23,
      quantity: 10,  
      description:'If there was an amusement park for kitties, this toy would be the main attraction. That’s because this interactive triple-decker tower from Frisco by Chewy has everything cats love—a ball to bat and chase around the tracks, the excitement of hearing the sound of the balls roll along the tracks, and even a fluttery butterfly on top! There are three levels for even more play, each with its own rolling ball, so more than one kitty can get in on the fun. Go ahead, let them go wild. The nonskid pads keep the track from sliding around when playtime goes into overtime.'}),
    Product.create({ 
      productType: 'accessory', 
      images:["https://image.chewy.com/is/image/catalog/107617_MAIN._AC_SL1200_V1527257529_.jpg"],
      name: 'SmartyKat Scratch Scroll Cat Scratcher with Feather Toy, Color Varies', 
      price:19.97, 
      quantity: 5, 
      description:'SmartyKat Multi-Surface Scratch Scroll Curred Cat Scratcher offers a combination of sisal and carpeted scratching surfaces to fulfill your cat’s instinctual desire to scratch. It’s the perfect outlet for your kitty, keeping furniture, drapes, carpets and walls safe. The scratching surfaces and unique shape attract cats. And it’s durable enough to withstand rigorous scratching. It’s covered in attractive fabric that looks great in any home. SmartyKat Multi-Surface Scratch Scroll Curred Cat Scratcher even has a dangling feather toy your cat will love to bat, bite, claw and swipe at.'}),
    Product.create({ 
      productType: 'accessory', 
      images: [
        "https://image.chewy.com/is/image/catalog/66578_MAIN._AC_SL1200_V1539004918_.jpg",
        "https://image.chewy.com/is/image/catalog/66578_PT1._AC_SL1200_V1539006139_.jpg",
        "https://image.chewy.com/is/image/catalog/66578_PT2._AC_SL1200_V1603135292_.jpg"
      ],
      name: 'KONG Active Feather Teaser Cat Toy, Color Varies', 
      price: 6.99,
      quantity: 10,  
      description:'Make playtime a priority with the KONG Active Feather Teaser Cat Toy! This interactive toy is great for playing one-on-one with your favorite feline. Bright feathers and a crinkle sound tempt your lil tiger to hunt. Each toy is stuffed with KONG Premium North American Catnip for even more stimulation. Each order includes one randomly selected character—see which one you get!'}),
    Product.create({ 
      productType: 'accessory', 
      images: [
        "https://image.chewy.com/is/image/catalog/139111_MAIN._AC_SL1200_V1589230979_.jpg",
        "https://image.chewy.com/is/image/catalog/139111_PT2._AC_SL1200_V1589230985_.jpg",
        "https://image.chewy.com/is/image/catalog/139111_PT1._AC_SL1200_V1589230979_.jpg"

      ],
      quantity: 3,
      name: 'Hartz Just for Cats Toy Variety Pack, 13 count', 
      price:5.99,  
      description:'Give your kitty the playtime variety he loves with the Hartz Just For Cats Toy Variety Pack. It’s a purr-pourri of fun for your pal, with a kitty-approved combo of lightweight toys like catnip mice, pompoms, balls and more. It even comes with catnip to add a boost of excitement to playtime. The toys are perfect for independent play, yet are lightweight enough so you can toss them and watch your little hunter go! Plus, they’re made with pet-safe materials and help provide daily exercise and mental stimulation for your pal.'})
    ]);
    const order1 = await Order.create({ userId: moe.id , isCart: false});
    const order2 = await Order.create({ userId: lucy.id, isCart: false });

    await LineItem.bulkCreate([
      { quantity: 3, productId: tunnel.id, orderId: order1.id },
      { quantity: 1, productId: homer.id, orderId: order1.id },
    ]);

    await LineItem.bulkCreate([
      { quantity: 1, productId: marge.id, orderId: order2.id },
      { quantity: 2, productId: tunnel.id, orderId: order2.id },
    ]);

  return {
    users: {
      moe,
      lucy,
      larry,
      admin
    },
    products: {
      marge,
      homer,
      tunnel
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Product,
  Order,
  LineItem
};

