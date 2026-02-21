// Sample Bible verses with hints for MemBlitz (NKJV)
const SAMPLE_VERSES = [
  {
    id: "sample-1",
    reference: { book: "John", chapter: 3, verse: "16" },
    text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    imageHintUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    textHint: "This verse, often called the 'Gospel in a nutshell,' summarizes God's love for humanity and the gift of salvation through Jesus Christ."
  },
  {
    id: "sample-2",
    reference: { book: "Philippians", chapter: 4, verse: "13" },
    text: "I can do all things through Christ who strengthens me.",
    imageHintUrl: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400",
    textHint: "Paul wrote this while in prison, showing that true strength comes from Christ regardless of circumstances."
  },
  {
    id: "sample-3",
    reference: { book: "Jeremiah", chapter: 29, verse: "11" },
    text: "For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope.",
    imageHintUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
    textHint: "God spoke these words to the Israelites in exile, promising restoration and a hopeful future."
  },
  {
    id: "sample-4",
    reference: { book: "Psalm", chapter: 23, verse: "1" },
    text: "The Lord is my shepherd; I shall not want.",
    imageHintUrl: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400",
    textHint: "David, a former shepherd himself, compares God's care to that of a shepherd who provides everything his sheep need."
  },
  {
    id: "sample-5",
    reference: { book: "Proverbs", chapter: 3, verse: "5-6" },
    text: "Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.",
    imageHintUrl: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400",
    textHint: "This wisdom teaching encourages complete trust in God rather than relying solely on human wisdom."
  },
  {
    id: "sample-6",
    reference: { book: "Romans", chapter: 8, verse: "28" },
    text: "And we know that all things work together for good to those who love God, to those who are the called according to His purpose.",
    imageHintUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    textHint: "Paul assures believers that God sovereignly uses all circumstances for their ultimate good."
  },
  {
    id: "sample-7",
    reference: { book: "Isaiah", chapter: 40, verse: "31" },
    text: "But those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary, they shall walk and not faint.",
    imageHintUrl: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400",
    textHint: "Isaiah promises that waiting on God brings supernatural strength and endurance."
  },
  {
    id: "sample-8",
    reference: { book: "Joshua", chapter: 1, verse: "9" },
    text: "Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the Lord your God is with you wherever you go.",
    imageHintUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    textHint: "God spoke these words to Joshua as he was about to lead Israel into the Promised Land after Moses' death."
  },
  {
    id: "sample-9",
    reference: { book: "Psalm", chapter: 119, verse: "105" },
    text: "Your word is a lamp to my feet and a light to my path.",
    imageHintUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400",
    textHint: "The psalmist describes how Scripture guides believers through life's darkness and uncertainty."
  },
  {
    id: "sample-10",
    reference: { book: "Matthew", chapter: 28, verse: "19-20" },
    text: "Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I have commanded you; and lo, I am with you always, even to the end of the age.",
    imageHintUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400",
    textHint: "Known as the Great Commission, Jesus gives his final instructions to the disciples before ascending to heaven."
  },
  {
    id: "sample-11",
    reference: { book: "Galatians", chapter: 2, verse: "20" },
    text: "I have been crucified with Christ; it is no longer I who live, but Christ lives in me; and the life which I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself for me.",
    imageHintUrl: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=400",
    textHint: "Paul describes the believer's identification with Christ's death and the new life that results from faith."
  },
  {
    id: "sample-12",
    reference: { book: "Hebrews", chapter: 11, verse: "1" },
    text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    imageHintUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
    textHint: "This verse provides the biblical definition of faith at the beginning of the 'Hall of Faith' chapter."
  },
  {
    id: "sample-13",
    reference: { book: "Romans", chapter: 12, verse: "2" },
    text: "And do not be conformed to this world, but be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God.",
    imageHintUrl: "https://images.unsplash.com/photo-1520642375606-695baa53dfe6?w=400",
    textHint: "Paul urges believers to reject worldly patterns and embrace spiritual transformation through renewed thinking."
  },
  {
    id: "sample-14",
    reference: { book: "2 Timothy", chapter: 1, verse: "7" },
    text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    imageHintUrl: "https://images.unsplash.com/photo-1533000759938-aa0ba70beceb?w=400",
    textHint: "Paul encourages Timothy that God empowers believers with courage, love, and self-discipline rather than fear."
  },
  {
    id: "sample-15",
    reference: { book: "1 Corinthians", chapter: 10, verse: "13" },
    text: "No temptation has overtaken you except such as is common to man; but God is faithful, who will not allow you to be tempted beyond what you are able, but with the temptation will also make the way of escape, that you may be able to bear it.",
    imageHintUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400",
    textHint: "Paul assures believers that God limits temptation and always provides a way out."
  },
  {
    id: "sample-16",
    reference: { book: "Ephesians", chapter: 2, verse: "8-9" },
    text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast.",
    imageHintUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400",
    textHint: "Paul explains that salvation is entirely a gift from God, not earned by human effort."
  },
  {
    id: "sample-17",
    reference: { book: "1 John", chapter: 1, verse: "9" },
    text: "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
    imageHintUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
    textHint: "John assures believers of God's promise to forgive when we honestly confess our sins."
  },
  {
    id: "sample-18",
    reference: { book: "Matthew", chapter: 6, verse: "33" },
    text: "But seek first the kingdom of God and His righteousness, and all these things shall be added to you.",
    imageHintUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400",
    textHint: "Jesus teaches that prioritizing God's kingdom leads to provision for all other needs."
  },
  {
    id: "sample-19",
    reference: { book: "Psalm", chapter: 46, verse: "10" },
    text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth!",
    imageHintUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400",
    textHint: "God calls believers to quiet trust, reminding them of His sovereign control over all nations."
  },
  {
    id: "sample-20",
    reference: { book: "Romans", chapter: 10, verse: "9" },
    text: "that if you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved.",
    imageHintUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400",
    textHint: "Paul outlines the simple requirements for salvation: verbal confession and heartfelt belief in Jesus' resurrection."
  },
  {
    id: "sample-21",
    reference: { book: "Psalm", chapter: 37, verse: "4" },
    text: "Delight yourself also in the Lord, and He shall give you the desires of your heart.",
    imageHintUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400",
    textHint: "David teaches that when we find our joy in God, He aligns our desires with His will."
  },
  {
    id: "sample-22",
    reference: { book: "Isaiah", chapter: 41, verse: "10" },
    text: "Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you, I will uphold you with My righteous right hand.",
    imageHintUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400",
    textHint: "God reassures Israel of His presence and support during times of fear and uncertainty."
  },
  {
    id: "sample-23",
    reference: { book: "Matthew", chapter: 11, verse: "28" },
    text: "Come to Me, all you who labor and are heavy laden, and I will give you rest.",
    imageHintUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    textHint: "Jesus invites all who are weary and burdened to find rest in Him."
  },
  {
    id: "sample-24",
    reference: { book: "Romans", chapter: 5, verse: "8" },
    text: "But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us.",
    imageHintUrl: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=400",
    textHint: "Paul highlights the unconditional nature of God's love shown through Christ's sacrifice."
  },
  {
    id: "sample-25",
    reference: { book: "Colossians", chapter: 3, verse: "23" },
    text: "And whatever you do, do it heartily, as to the Lord and not to men.",
    imageHintUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400",
    textHint: "Paul instructs believers to work with excellence and dedication as service to God."
  },
  {
    id: "sample-26",
    reference: { book: "1 Peter", chapter: 5, verse: "7" },
    text: "casting all your care upon Him, for He cares for you.",
    imageHintUrl: "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=400",
    textHint: "Peter encourages believers to release their anxieties to God who genuinely cares for them."
  },
  {
    id: "sample-27",
    reference: { book: "James", chapter: 1, verse: "5" },
    text: "If any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him.",
    imageHintUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400",
    textHint: "James promises that God generously gives wisdom to those who ask in faith."
  },
  {
    id: "sample-28",
    reference: { book: "Psalm", chapter: 27, verse: "1" },
    text: "The Lord is my light and my salvation; whom shall I fear? The Lord is the strength of my life; of whom shall I be afraid?",
    imageHintUrl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400",
    textHint: "David declares confidence in God as his source of light, salvation, and strength."
  },
  {
    id: "sample-29",
    reference: { book: "Hebrews", chapter: 12, verse: "2" },
    text: "looking unto Jesus, the author and finisher of our faith, who for the joy that was set before Him endured the cross, despising the shame, and has sat down at the right hand of the throne of God.",
    imageHintUrl: "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=400",
    textHint: "The author urges believers to focus on Jesus as the perfect example of faith and endurance."
  },
  {
    id: "sample-30",
    reference: { book: "Romans", chapter: 6, verse: "23" },
    text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
    imageHintUrl: "https://images.unsplash.com/photo-1549492423-400259736abb?w=400",
    textHint: "Paul contrasts the consequence of sin with the free gift of salvation through Christ."
  },
  {
    id: "sample-31",
    reference: { book: "Psalm", chapter: 139, verse: "14" },
    text: "I will praise You, for I am fearfully and wonderfully made; marvelous are Your works, and that my soul knows very well.",
    imageHintUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400",
    textHint: "David praises God for the intricate and intentional way He created each person."
  },
  {
    id: "sample-32",
    reference: { book: "Matthew", chapter: 5, verse: "16" },
    text: "Let your light so shine before men, that they may see your good works and glorify your Father in heaven.",
    imageHintUrl: "https://images.unsplash.com/photo-1429277096327-11ee3b761c93?w=400",
    textHint: "Jesus calls believers to live visibly righteous lives that point others to God."
  },
  {
    id: "sample-33",
    reference: { book: "2 Corinthians", chapter: 5, verse: "17" },
    text: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.",
    imageHintUrl: "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=400",
    textHint: "Paul describes the transformative power of salvation that makes believers entirely new."
  },
  {
    id: "sample-34",
    reference: { book: "Psalm", chapter: 34, verse: "8" },
    text: "Oh, taste and see that the Lord is good; blessed is the man who trusts in Him!",
    imageHintUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400",
    textHint: "David invites others to experience God's goodness firsthand through trust."
  },
  {
    id: "sample-35",
    reference: { book: "John", chapter: 14, verse: "6" },
    text: "Jesus said to him, \"I am the way, the truth, and the life. No one comes to the Father except through Me.\"",
    imageHintUrl: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400",
    textHint: "Jesus declares Himself as the exclusive path to God the Father."
  },
  {
    id: "sample-36",
    reference: { book: "Lamentations", chapter: 3, verse: "22-23" },
    text: "Through the Lord's mercies we are not consumed, because His compassions fail not. They are new every morning; great is Your faithfulness.",
    imageHintUrl: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400",
    textHint: "Jeremiah finds hope in God's unfailing mercy and daily renewed compassion."
  },
  {
    id: "sample-37",
    reference: { book: "1 John", chapter: 4, verse: "19" },
    text: "We love Him because He first loved us.",
    imageHintUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400",
    textHint: "John explains that our ability to love originates from God's prior love for us."
  },
  {
    id: "sample-38",
    reference: { book: "Psalm", chapter: 51, verse: "10" },
    text: "Create in me a clean heart, O God, and renew a steadfast spirit within me.",
    imageHintUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
    textHint: "David's prayer of repentance after his sin, asking God for inner renewal."
  },
  {
    id: "sample-39",
    reference: { book: "Micah", chapter: 6, verse: "8" },
    text: "He has shown you, O man, what is good; and what does the Lord require of you but to do justly, to love mercy, and to walk humbly with your God?",
    imageHintUrl: "https://images.unsplash.com/photo-1490730141103-6cac27abb37f?w=400",
    textHint: "Micah summarizes God's requirements: justice, mercy, and humble obedience."
  },
  {
    id: "sample-40",
    reference: { book: "John", chapter: 1, verse: "12" },
    text: "But as many as received Him, to them He gave the right to become children of God, to those who believe in His name.",
    imageHintUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
    textHint: "John explains that receiving Christ grants the privilege of becoming God's children."
  },
  {
    id: "sample-41",
    reference: { book: "Philippians", chapter: 4, verse: "6-7" },
    text: "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.",
    imageHintUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    textHint: "Paul prescribes prayer as the antidote to anxiety, promising supernatural peace."
  },
  {
    id: "sample-42",
    reference: { book: "Deuteronomy", chapter: 31, verse: "6" },
    text: "Be strong and of good courage, do not fear nor be afraid of them; for the Lord your God, He is the One who goes with you. He will not leave you nor forsake you.",
    imageHintUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    textHint: "Moses encourages Israel with God's promise of constant presence and protection."
  },
  {
    id: "sample-43",
    reference: { book: "Romans", chapter: 15, verse: "13" },
    text: "Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope by the power of the Holy Spirit.",
    imageHintUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    textHint: "Paul's blessing prayer for believers to overflow with hope, joy, and peace."
  },
  {
    id: "sample-44",
    reference: { book: "Psalm", chapter: 100, verse: "4-5" },
    text: "Enter into His gates with thanksgiving, and into His courts with praise. Be thankful to Him, and bless His name. For the Lord is good; His mercy is everlasting, and His truth endures to all generations.",
    imageHintUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400",
    textHint: "A call to worship God with gratitude, celebrating His eternal goodness and faithfulness."
  },
  {
    id: "sample-45",
    reference: { book: "John", chapter: 10, verse: "10" },
    text: "The thief does not come except to steal, and to kill, and to destroy. I have come that they may have life, and that they may have it more abundantly.",
    imageHintUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
    textHint: "Jesus contrasts Satan's destructive purpose with His own mission to give abundant life."
  },
  {
    id: "sample-46",
    reference: { book: "Isaiah", chapter: 53, verse: "5" },
    text: "But He was wounded for our transgressions, He was bruised for our iniquities; the chastisement for our peace was upon Him, and by His stripes we are healed.",
    imageHintUrl: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=400",
    textHint: "Isaiah prophesies the substitutionary suffering of the Messiah for humanity's sins."
  },
  {
    id: "sample-47",
    reference: { book: "1 Corinthians", chapter: 13, verse: "4-5" },
    text: "Love suffers long and is kind; love does not envy; love does not parade itself, is not puffed up; does not behave rudely, does not seek its own, is not provoked, thinks no evil.",
    imageHintUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400",
    textHint: "Paul defines the characteristics of true love in the famous 'love chapter'."
  },
  {
    id: "sample-48",
    reference: { book: "Psalm", chapter: 91, verse: "1-2" },
    text: "He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty. I will say of the Lord, \"He is my refuge and my fortress; my God, in Him I will trust.\"",
    imageHintUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400",
    textHint: "A declaration of trust in God's protection for those who seek refuge in Him."
  },
  {
    id: "sample-49",
    reference: { book: "Acts", chapter: 1, verse: "8" },
    text: "But you shall receive power when the Holy Spirit has come upon you; and you shall be witnesses to Me in Jerusalem, and in all Judea and Samaria, and to the end of the earth.",
    imageHintUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400",
    textHint: "Jesus promises the Holy Spirit's empowerment for worldwide witness before His ascension."
  },
  {
    id: "sample-50",
    reference: { book: "Revelation", chapter: 21, verse: "4" },
    text: "And God will wipe away every tear from their eyes; there shall be no more death, nor sorrow, nor crying. There shall be no more pain, for the former things have passed away.",
    imageHintUrl: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400",
    textHint: "John's vision of the new heaven and earth where God removes all suffering forever."
  }
];
