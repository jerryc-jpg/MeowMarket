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
    
    ///cats
    Product.create({ 
      productType: 'cat', 
      name: 'Marge',
      images:[
        "https://images.pexels.com/photos/17095800/pexels-photo-17095800/free-photo-of-animal-pet-cute-grey.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/17095796/pexels-photo-17095796/free-photo-of-animal-pet-cute-grey.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/7725986/pexels-photo-7725986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
      quantity:1,
      price:113, 
      age: 1,
      breed:'Scottish Fold & Domestic Short Hair Mix',
      description: "While many know Marge as the mom on the animated series \"The Simpsons\", most do not know that she was once an avid disciple of Gandhi. Because of her disciplined approach to mindful meditation and her grounded philosophy on life, she has garnered a following of her own and has become somewhat of a guru herself in the spiritual community. Nicknamed by Gandhi himself, as \"the most chill kitten ever\", Marge prefers her simple nickname given to her by her siblings: Margie-moo.\n\nDespite her sudden rise to fame and quick ascent to critically acclaimed bestseller of books in the spiritual self-help genre, Marge is unbothered by fame and continues to practice meditation, afternoon naps, and sunbathing.\n\nLiving up to her nickname as the most chill kitten ever, Marge loves to cuddle on your lap, cuddle with her siblings, and play. We always prefer the kittens to be adopted out in pairs since they're still so young, have grown up together, and need the companionship of another kitten to help their development. She gets along with all her siblings and would like to be adopted with any one of the other Simpsons bunch: Homer, Bart, Lisa, or Maggie."}),
    
    Product.create({ 
      productType: 'cat', 
      name: 'Homer', 
      images:[
        "https://petkeen.com/wp-content/uploads/2022/02/American-shorthair-kitten_Top-Photo-Engineer-Shutterstock.jpg",
        "https://www.petful.com/wp-content/uploads/2016/06/american-shorthair-cat-750x434.jpg",
        "https://www.bubblypet.com/wp-content/uploads/2022/09/American-Shorthair-price-and-expenses-how-much-does-an-American-Shorthair-cost.jpg",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849453/3/?bust=1685904397&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849453/1/?bust=1685904396&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849453/2/?bust=1685904455&width=1080",
      ],
      quantity:1,
      price:113, 
      age: 1,
      breed:'Domestic Short Hair Mix ',
      description: "While Homer is best known for his role of the father on the \"Simpsons\", many do not know he was also a famous operatic singer in his past life and demonstrates his vocal technique when he is hungry, or to let you know when unwanted flies are in the home and that he will go chase them down for you.\n\nHomer did qualify for the 2020 Olympics in the sport of \"interactive-cat-toy-with-feather hunting\" but has chosen to remain a house cat and pursue this sport as a side hobby instead. If you bring out an interactive cat toy with a feather however, you may be lucky enough to witness his competitive, winning hunting moves.\n\nMost of all, Homer loves to cuddle on your lap, with his siblings, and to play. We always prefer the kittens to be adopted out in pairs, since they're still so young, have grown up together, and need the companionship of another kitten to help their development. Homer gets along with all his siblings and would like to be adopted with any one of the other Simpsons bunch: Bart, Marge, Lisa or Maggie."}),
  
     Product.create({ 
      productType: 'cat', 
      name: 'Lisa', 
      images:[
        "https://cat-world.com/wp-content/uploads/2017/02/american-shorthair-breed-profile.jpg",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849348/3/?bust=1685903457&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849348/1/?bust=1685903454&width=1080",
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849348/3/?bust=1685903457&width=1080"
      ],
      quantity:1,
      price:113, 
      age: 1,
      breed:'Tabby & Domestic Short Hair Mix',
      description:"Lisa, also known as Lisa Lovebug, is one of the kittens from the \"Simpsons\" litter. Multitalented, Lisa was trained from a young age as a metalsmith, but has a fine appreciation for all types of metal arts, including jewelry design. While she used to be a consultant designer at Cartier and spent a few years working for Rolex, she has now taken her talents to Kitten Rescue, where she admires and plays with anything shiny and metal. She will likely sit right in your lap upon meeting you and start grooming your hand immediately. Lisa shows her love each morning by waking you up with some licks and letting you know she is ready to eat!\n\nLisa loves to cuddle on your lap, with her siblings, and play. We always prefer the kittens to be adopted out in pairs, since they're still so young, have grown up together, and need the companionship of another kitten to help their development. She gets along with all her siblings and would like to be adopted with any one of the other Simpsons bunch: Homer, Bart, Marge or Maggie."}),
   
    Product.create({ 
      productType: 'cat', 
      name: 'Maggie', 
      images:[
        'https://www.thehappycatsite.com/wp-content/uploads/2017/06/tabby-kitten.jpg',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849146/2/?bust=1685903008&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849146/1/?bust=1685903008&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64849146/3/?bust=1685903092&width=1080'
      ],
      quantity:1,
      age: 1,
      price:113, 
      breed:'Torbie & Domestic Short Hair Mix',
      description:"Maggie, known for her portrayal of the baby on the animated classic \"The Simpsons\", has brought her stardom to Kitten Rescue and is ready to be adopted! The runt of the \"Simpsons\" litter, Maggie is the littlest baby of the bunch. What many do not know about her, is in a past life, she was a V8 Ferrari Engine, and likes to demonstrate this with her constant purring.\n\nMaggie, a.k.a. Maggie Moo, is a very sweet and gentle kitten. While shy at first, once she warms up, she will want all the pets and snuggles. A true little sister, Maggie loves to follow her brothers and sisters around to play and cuddle!\n\nWe always prefer the kittens to be adopted out in pairs, since they're still so young, have grown up together, and need the companionship of another kitten to help their development. She gets along with all her siblings and would like to be adopted with any one of the other Simpsons bunch: Homer, Bart, Marge or Lisa, though she is most bonded with Bart."}),

    Product.create({ 
      productType: 'cat', 
      name: 'Bart', 
      images:[
        'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64848945/1/?bust=1685901615&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64848945/3/?bust=1685901619&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64848945/2/?bust=1685901619&width=1080'
      ],
      quantity:1,
      price:113, 
      age: 1,
      breed:'Tabby & Domestic Short Hair Mix',
      description:"Bart, known to his fans as Bartholamew or Bartimus the third, was once a squeak toy. However, he has decided to pursue his lifelong dream of being a house cat instead. If you're lucky though, you will hear the remnants of his past life in the form of his tiny, sweet squeaks.\n\nOften mistaken for a teddy bear, Bart loves to cuddle and constantly be in your lap. If he had it his way, he would be carried around like a baby the whole day. Upon being picked up, he transforms into a rag doll and calmly flops around happily in your arms.\n\nBart loves to cuddle on your lap, with his siblings, and play. We always prefer the kittens to be adopted out in pairs, since they're still so young, have grown up together, and need the companionship of another kitten to help their development. He gets along with all his siblings and would like to be adopted with any one of the other Simpsons bunch: Homer, Marge, Lisa or Maggie, though he is most bonded with Maggie."}),

    Product.create({ 
      productType: 'cat', 
      name: 'Ellen', 
      images:[
        'https://petsnurturing.com/wp-content/uploads/2022/04/lynx-point-siamese-5.jpg',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57428659/1/?bust=1685743719&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57428659/3/?bust=1686107976&width=1080'
      ],
      quantity:1,
      age: 8,
      price:113, 
      breed:'Siamese Mix',
      description:"Ellen is a pretty funky cat. She likes to lay around and just hang out all day. She is an older cat, so she's not too huge on toys or being held a lot. She likes to find really dark areas to hide out in until there isn't a lot going on. Unfortunately, Ellen doesn't have many teeth left, so she loves her wet food! \n\nEven though she is one of the most gorgeous cats we've had, she's just not your social butterfly. She likes to hide away and keep to herself when given the chance. With her lack of teeth and not so friendly demeanor, she's proven to be a difficult cat to adopt. All Ellen really needs is a loving home with people that have the time and patience to acclimate a scared, older cat. Does that sound like you?"}),

    Product.create({ 
      productType: 'cat', 
      name: 'Morticia', 
      images:[
        'https://images.pexels.com/photos/1492219/pexels-photo-1492219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/9013023/pexels-photo-9013023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52521655/1/?bust=1685943604&width=1080'
      ],
      quantity:1,
      price:113, 
      age: 2,
      breed:'Munchkin & Domestic Short Hair Mix',
      description:"Hi, My name is Morticia! I'm an about 2-year-old female munchkin/ domestic shorthair mix. I weigh roughly 7 lbs right now and won't grow anymore. I am spayed and fully vaccinated. I lived outside under my foster mom's house since I was born, so adjusting to living in a house is hard for me. Don't worry, I don't tear anything up or pee all over (I am fully box trained!!) but I am very fearful of people. I do love food though so my foster moms have been able to win me over with treats and food. So far I don't love to cuddle and haven't learned to show affection yet and have been so focused on helping care for my babies and grandbabies that I haven't started playing yet."}),

    Product.create({ 
      productType: 'cat', 
      name: 'Fiona', 
      images:[
        'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60652076/1/?bust=1685721039&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60652076/2/?bust=1685721039&width=1080',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60652076/3/?bust=1685721039&width=1080'
      ],
      quantity:1,
      price:113, 
      age: 7,
      breed:'Tabby & Domestic Short Hair Mix',
      description:"Fiona was recently found with her deceased owner and sent to the shelter; they contacted us and she was reunited with her original foster.She is a very affectionate and well-behaved soul; a chubbette in beautiful condition, with lovely soft fur and lovely, huge sad green eyes like a Keane painting. After much love from her foster, she is finally healing from her trauma, and has become playful, friendly, and confident. She loves aggressive scritches, full body kitty massages, snuggling at bedtime, and greeting you in the morning with smiles, purrs, and a breath check.Fiona likes to be the queen of her domain, so she will need to be an only kitty. You will fall in love with this girl"}),

    Product.create({ 
      productType: 'cat', 
      name: 'Prairie', 
      images:[
        'https://images.pexels.com/photos/266784/pexels-photo-266784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/64447970/1/?bust=1684179102&width=1080'],
      quantity:1,
      price:113, 
      breed:'Dilute Calico',
      age: 3,
      description:"Prairie was trapped with her , mom, dad, bother and sisters july 4th weekend 2021. She and siblings were about 6 weeks and feral. They’ve slowly come around over 2 years but will require someone with extreme patience. Prairie is still the most timid of the bunch. "}),

      Product.create({ 
        productType: 'cat', 
        name: 'Coco', 
        images:[
          'https://images.unsplash.com/photo-1620933288385-b2f6f1931d9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
          'https://images.unsplash.com/photo-1588516920619-13720333d65d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=711&q=80]',
          'https://images.unsplash.com/photo-1568470010257-111aa304d53b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80',
        ],
        quantity:1,
        price:113, 
        breed:'Ragdoll',
        age: 3,
        description:"Little Coco is a beautiful bicolor, mitted ragdoll. He is very playful and friendly. Someone backed out of adopting him. He will be a beauty as he grows. He’s eating dry food, drinking water, and using the litter box. He’s a little doll who deserves a loving family."}),
   
      Product.create({ 
        productType: 'cat', 
        name: 'Greygory', 
        images:[
          'https://images.pexels.com/photos/236606/pexels-photo-236606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://cf.ltkcdn.net/life-with-pets/find-your-pet/images/orig/320511-1600x1030-gorgeous-grey-cat-breeds.jpg',
          'https://hips.hearstapps.com/hmg-prod/images/cute-grey-cat-royalty-free-image-1658452916.jpg',
        ],
        quantity:1,
        price:113, 
        breed:'American Shorthair',
        age: 3,
        description:"Greygory is a real gem of a kitty. He is a friendly, good tempered kitty, happy to play or just be near The Humans. He very much enjoys the company of other cats, and I think would also tolerate a well behaved dog. He would also thrive in a single-cat household with a human or two to give him attention. He is shy at first, but can't resist going for pets eventually, and will sit in your lap as soon as he thinks you'll let him :) "}),
      
        Product.create({ 
          productType: 'cat', 
          name: 'Furball', 
          images:[
            'https://images.pexels.com/photos/173909/pexels-photo-173909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/137049/pexels-photo-137049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          quantity:1,
          price:113, 
          breed:'Domestic Longhair/Domestic Shorthair',
          age: 3,
          description:"Meet Furball! Furball recently made it into our adoption program and staff is still getting to know her. Furball is one of our Special Care pets meaning she needs a bit more love. Furball has a chronic ear infection and scarring in her left year. She will require regular ear cleanings and management at a private vet. Furball is also a big gal, and will need to work on weight management.  "}),
        
        //accessories

    Product.create({ 
      productType: 'accessory', 
      images: [
        "https://cdn.webshopapp.com/shops/289894/files/428628671/image.jpg",
        /*"https://cdn.webshopapp.com/shops/289894/files/429283754/image.jpg",
        "https://cdn.webshopapp.com/shops/289894/files/428628791/image.jpg",*/
      ],
      name: 'BAIT ', 
      price:8.99,  
      quantity: 20,
      description:'Could your cat use some exercise or is it just overflowing with energy? The cardboard wand toy BAIT is the ideal toy to provide your (indoor) cat with an interactive hour of fun!'}),
    
    
    Product.create({ 
      productType: 'accessory', 
      images:["https://image.chewy.com/is/image/catalog/308889_PT3._AC_SL600_V1642688496_.jpg"],
      name: 'BEE CAT TRACKS', 
      price: 10.23,
      quantity: 10,  
      description:'If there was an amusement park for kitties, this toy would be the main attraction. That’s because this interactive triple-decker tower from Frisco by Chewy has everything cats love—a ball to bat and chase around the tracks, the excitement of hearing the sound of the balls roll along the tracks, and even a fluttery butterfly on top! There are three levels for even more play, each with its own rolling ball, so more than one kitty can get in on the fun. Go ahead, let them go wild. The nonskid pads keep the track from sliding around when playtime goes into overtime.'}),
    
    Product.create({ 
      productType: 'accessory', 
      images: [
        "https://cdn.webshopapp.com/shops/289894/files/388670489/image.jpg",
        /*"https://cdn.webshopapp.com/shops/289894/files/388670483/image.jpg",
        "https://cdn.webshopapp.com/shops/289894/files/407060552/image.jpg"*/
      ],
      quantity: 20,
      name: 'MAZE & BED', 
      price:24.95,  
      description:'The MAZE 3-in-1 collapsible cardboard cat bed features a lounge spot, cat scratcher and cat scratch toy all-in-one. *No cardboard toy is indestructible, please be aware that it will change condition with enthusiastic use.'}),
    
    Product.create({ 
      productType: 'accessory', 
      images: [
        "https://cdn.webshopapp.com/shops/289894/files/419346781/image.jpg",
         /*"https://cdn.webshopapp.com/shops/289894/files/412510461/image.jpg",
        "https://cdn.webshopapp.com/shops/289894/files/429697795/image.jpg"*/
      ],
      quantity: 20,
      name: 'WHISKER ', 
      price:64.95,  
      description:'WHISKER - Cardboard Cat Scratcher - 55 x 29 x 30 cm.  The WHISKER cat scratcher is covered with corrugated cardboard, perfect for your cat to scratch. The cat scratcher adds a funny touch to your interior.'}),  

    Product.create({ 
      productType: 'accessory', 
      images: [
          "https://cdn.webshopapp.com/shops/289894/files/388585796/image.jpg",
          /*"https://cdn.webshopapp.com/shops/289894/files/388585872/image.jpg",
          "https://cdn.webshopapp.com/shops/289894/files/388585826/image.jpg",
          "https://cdn.webshopapp.com/shops/289894/files/407044865/image.jpg"*/
      ],
      quantity: 20,
      name: 'FIESTA', 
      price:17.95,  
      description:'FIESTA - Cardboard Cat Toy - With jingling ball inside. Surprise your cat with a cardboard toy in the shape of a birthday cake that provides hours of fun! Receiving or giving the FIESTA is a real party.'}),

      Product.create({ 
        productType: 'accessory', 
        images: [
            "https://cdn.webshopapp.com/shops/289894/files/412330860/image.jpg",
            /*"https://cdn.webshopapp.com/shops/289894/files/388694834/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/388694809/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/388694919/image.jpg"*/
        ],
        quantity: 20,
        name: 'SOFA', 
        price:39.95,  
        description:'FIESTA - Caof fun! Receiving or giving the FIESTA is a real party.',
      }),

      Product.create({ 
        productType: 'accessory', 
        images: [
            "https://cdn.webshopapp.com/shops/289894/files/393584549/image.jpg",
            /*"https://cdn.webshopapp.com/shops/289894/files/393891047/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/391172645/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/391172757/image.jpg"*/
        ],
        quantity: 20,
        name: 'TRUCK', 
        price:59.95,  
        description:'TRUNK - Rural Design Cat Scratcher. This funny cat scratcher TRUNK is made in the shape of a tree trunk and fits a rural and woodsy interior. Creates a perfect hideaway with one entrance.',
      }),

      Product.create({ 
        productType: 'accessory', 
        images: ["https://i.etsystatic.com/11947825/r/il/08ed50/4861047293/il_794xN.4861047293_clmt.jpg",
            /*"https://i.etsystatic.com/11947825/r/il/1cd3a2/4861047263/il_794xN.4861047263_ps4y.jpg",
            "https://i.etsystatic.com/11947825/r/il/975f32/4861047305/il_794xN.4861047305_p6mk.jpg",
            "https://i.etsystatic.com/10382984/r/il/2c1590/2008258528/il_794xN.2008258528_6u0o.jpg"*/
        ],
        quantity: 20,
        name: 'CAT CAVE', 
        price:89.95,  
        description:'A Wooly Cat Cave is a perfect secret shelter for your cat to nap, but it is also a fun place to play. It Is not just a cat cave, it is an original piece of furniture with sinuous shapes, a modern cat bed but soft and dreamy design, blending in harmony with different styles of furnishings.',
      }),

      Product.create({ 
        productType: 'accessory', 
        images: ["https://cdn.webshopapp.com/shops/289894/files/408205982/image.jpg",
            /*"https://cdn.webshopapp.com/shops/289894/files/408205932/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/408205627/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/410503031/image.jpg"*/
        ],
        quantity: 20,
        name: 'BAMBOO SLOW FEEDER', 
        price:12.95,  
        description:'Cats have a mind of their own when it comes to food, but some are so enthusiastic that it is gone before you know it. For these fast eaters, our BAMBOO slow feeder is a useful tool for dosing the meal.',
      }),

      Product.create({ 
        productType: 'accessory', 
        images: ["https://cdn.webshopapp.com/shops/289894/files/419345784/image.jpg",
            /*"https://cdn.webshopapp.com/shops/289894/files/417394039/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/419345773/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/419345918/image.jpg"*/
        ],
        quantity: 20,
        name: 'CASA TEDD BED', 
        price:12.95,  
        description:'CASA Teddy - Trendy Cat House - Stylish Cat Bed - 45 x 45 x 60 cm - Dark Grey, Mocca and Cream.The teddy trend is here to stay as we are seeing it on clothing, to furniture to accessories. So how nice is it to be able to combine your furniture with a comfy teddy house for your cat!',
      }),

      Product.create({ 
        productType: 'accessory', 
        images: ["https://cdn.webshopapp.com/shops/289894/files/412331696/image.jpg",
            /*"https://cdn.webshopapp.com/shops/289894/files/397242967/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/410835205/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/397242981/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/410835307/image.jpg",*/
        ],
        quantity: 20,
        name: 'TIMBER BED', 
        price:12.95,  
        description:'TIMBER - Ultra-Soft Cat Bed - Luxury Design - 46 x 46 x 15 cm. This ultra-soft cat bed TIMBER will be your cat\'s favourite new sleeping district. This cat bed serves as the perfect spot for a long day of adventurous dreams.',
      }),

      Product.create({ 
        productType: 'accessory', 
        images: ["https://cdn.shoplightspeed.com/shops/665375/files/47927250/image.jpg",
            /*"https://cdn.webshopapp.com/shops/289894/files/388685613/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/397242967/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/410835205/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/397242981/image.jpg",
            "https://cdn.webshopapp.com/shops/289894/files/410835307/image.jpg",*/
        ],
        quantity: 20,
        name: 'SARDINE SCRATCHER', 
        price:64.95,  
        description:'SARDINE - Cardboard Cat Scratcher - 60 x 30 x 30 cm - White, Black and Pink. The SARDINE cat scratcher is covered with corrugated cardboard, perfect for your cat to scratch. The cat scratcher adds a funny touch to your interior.',
      }),
      
      // Product.create({ 
      //   productType: 'accessory', 
      //   images: [
      //       "https://image.chewy.com/is/image/catalog/166382_MAIN._AC_SL1200_V1668737518_.jpg",
      //       /*"https://image.chewy.com/is/image/catalog/166382_PT2._AC_SL1200_V1682976333_.jpg"*/
      //   ],
      //     quantity: 20,
      //     name: 'Tri-Tunnel', 
      //     price:11.35,  
      //     description:'Frisco Foldable Play Tri-Tunnel Cat Toy, Colorful. Get ready for some pop-up fun with your kitty with this colorful, pop-open play tunnel from Frisco by Chewy. Every cat loves exploring a tunnel, so give your feline all the fun and feels of spending the day as a furry cave explorer. Just pop it open and then fold it down when you need to store it. Cats also love hiding and napping inside it, so you might want to leave it around so they always have the option of tucking in for a nap.'}),
        
      // Product.create({ 
      //   productType: 'accessory', 
      //   images:["https://image.chewy.com/is/image/catalog/107617_MAIN._AC_SL1200_V1527257529_.jpg"],
      //   name: 'SCRATCHER', 
      //   price:19.97, 
      //   quantity: 5, 
      //   description:'SmartyKat Multi-Surface Scratch Scroll Curred Cat Scratcher offers a combination of sisal and carpeted scratching surfaces to fulfill your cat’s instinctual desire to scratch. It’s the perfect outlet for your kitty, keeping furniture, drapes, carpets and walls safe. The scratching surfaces and unique shape attract cats. And it’s durable enough to withstand rigorous scratching. It’s covered in attractive fabric that looks great in any home. SmartyKat Multi-Surface Scratch Scroll Curred Cat Scratcher even has a dangling feather toy your cat will love to bat, bite, claw and swipe at.'}),
      
      // Product.create({ 
      //   productType: 'accessory', 
      //   images: [
      //     "https://image.chewy.com/is/image/catalog/139111_MAIN._AC_SL1200_V1589230979_.jpg",
      //     /*
      //     "https://image.chewy.com/is/image/catalog/139111_PT2._AC_SL1200_V1589230985_.jpg",
      //     "https://image.chewy.com/is/image/catalog/139111_PT1._AC_SL1200_V1589230979_.jpg"*/
  
      //   ],
      //   quantity: 20,
      //   name: 'Hartz Just for Cats Toy Variety Pack, 13 count', 
      //   price:5.99,  
      //   description:'Give your kitty the playtime variety he loves with the Hartz Just For Cats Toy Variety Pack. It’s a purr-pourri of fun for your pal, with a kitty-approved combo of lightweight toys like catnip mice, pompoms, balls and more. It even comes with catnip to add a boost of excitement to playtime. The toys are perfect for independent play, yet are lightweight enough so you can toss them and watch your little hunter go! Plus, they’re made with pet-safe materials and help provide daily exercise and mental stimulation for your pal.'}),
      
      // Product.create({ 
      //   productType: 'accessory', 
      //   images:[
      //     "https://image.chewy.com/is/image/catalog/213910_MAIN._AC_SL1200_V1590069698_.jpg",
      //     /*"https://image.chewy.com/is/image/catalog/213910_PT1._AC_SL1200_V1597156859_.jpg"*/
      //   ],
      //   name: 'Frisco Sushi Plush Cat Toy with Catnip, Small, 4 count', 
      //   price:5.42,  
      //   quantity: 15,
      //   description:'If there’s one food your cat would love to try, it’s probably some delicious sushi. Get them a little taste of those forbidden foods with the Frisco Plush Sushi Cat Toy with Catnip. This four pack of plush toys includes three different sushi rolls and a tasty wasabi packet, covered in soft fabric that’s great for batting, clawing and biting. And these toys are stuffed with enticing catnip to keep your cat coming back to play again and again. Bring out your furry friend’s inner foodie with these toys!'}),
      
      // Product.create({ 
      //   productType: 'accessory', 
      //   images:[
      //     "https://image.chewy.com/is/image/catalog/556182_MAIN._AC_SL1200_V1677530963_.jpg",
      //     /*"https://image.chewy.com/is/image/catalog/556182_PT4._AC_SL1200_V1675714036_.jpg"*/
      //   ],
      //   name: 'BEACH CAP', 
      //   price:15.99, 
      //   quantity: 20, 
      //   description:'Frisco Blue Ocean Waves 30 + UPF Dog & Cat Beach Cap. Don’t let the sun harsh your pal’s warm-weather mellow. Keep their head protected from 98% of the sun’s harmful UV rays with Frisco by Chewy’s 30+ UPF beach cap. The polyester fabric and wide brim block direct sunlight, offering protection without cramping their style. The lightweight polyester/spandex fabric helps keep them cool, and the adjustable toggle makes it easy to secure so it won’t fall off while they frolic through the surf.'}),
    
      // Product.create({ 
      //   productType: 'accessory', 
      //   images:[
      //     "https://image.chewy.com/is/image/catalog/777974_MAIN._AC_SL1200_V1676565789_.jpg",
      //     /*"https://image.chewy.com/is/image/catalog/777974_PT1._AC_SL1200_V1676653965_.jpg"*/
      //   ],
      //   name: 'Raw Paws Compressed Catnip Ball Cat Toy, 6 count' , 
      //   price:14.99,  
      //   quantity: 20,
      //   description:'Give your kitty the catnip she craves! Raw Paws Compressed Catnip Ball Cat Toy is made with 100% natural, fully digestible catnip with no preservatives, chemicals or toxins. When your favorite feline smells the solid catnip ball, it acts as a stimulant that encourages her to exercise and play. But when she licks and ingests it, the ball becomes a sedative that calms and relaxes her, melting away her stress. The compressed, purr-fectly safe to eat, catnip ball can also serve as a digestive aid reducing discomfort and helping your fur-iend feel her best.'}),
      

      //

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

