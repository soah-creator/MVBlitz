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
  },
  {
    id: "sample-51",
    reference: { book: "1 Peter", chapter: 2, verse: "9" },
    text: "But you are a chosen generation, a royal priesthood, a holy nation, His own special people, that you may proclaim the praises of Him who called you out of darkness into His marvelous light.",
    imageHintUrl: null,
    textHint: "Peter describes believers' exalted identity and purpose as God's chosen people."
  },
  {
    id: "sample-52",
    reference: { book: "2 Samuel", chapter: 5, verse: "10" },
    text: "So David went on and became great, and the Lord God of hosts was with him.",
    imageHintUrl: null,
    textHint: "A summary of David's rise to greatness, attributed entirely to God's presence with him."
  },
  {
    id: "sample-53",
    reference: { book: "Psalm", chapter: 119, verse: "11" },
    text: "Your word I have hidden in my heart, that I might not sin against You.",
    imageHintUrl: null,
    textHint: "The psalmist emphasizes memorizing Scripture as a defense against sin."
  },
  {
    id: "sample-54",
    reference: { book: "John", chapter: 10, verse: "9" },
    text: "I am the door. If anyone enters by Me, he will be saved, and will go in and out and find pasture.",
    imageHintUrl: null,
    textHint: "Jesus declares Himself as the only entrance to salvation and spiritual nourishment."
  },
  {
    id: "sample-55",
    reference: { book: "Psalm", chapter: 23, verse: "1-6" },
    text: "The Lord is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters. He restores my soul; He leads me in the paths of righteousness for His name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil; for You are with me; Your rod and Your staff, they comfort me. You prepare a table before me in the presence of my enemies; You anoint my head with oil; my cup runs over. Surely goodness and mercy shall follow me all the days of my life; and I will dwell in the house of the Lord forever.",
    imageHintUrl: null,
    textHint: "The complete Shepherd's Psalm, David's beloved declaration of God's provision, protection, and eternal care."
  },
  {
    id: "sample-56",
    reference: { book: "Matthew", chapter: 19, verse: "26" },
    text: "But Jesus looked at them and said to them, \"With men this is impossible, but with God all things are possible.\"",
    imageHintUrl: null,
    textHint: "Jesus assures His disciples that God's power transcends all human limitations."
  },
  {
    id: "sample-57",
    reference: { book: "Philippians", chapter: 4, verse: "19" },
    text: "And my God shall supply all your need according to His riches in glory by Christ Jesus.",
    imageHintUrl: null,
    textHint: "Paul assures the Philippians that God will meet every need from His unlimited resources."
  },
  {
    id: "sample-58",
    reference: { book: "Psalm", chapter: 90, verse: "12" },
    text: "So teach us to number our days, that we may gain a heart of wisdom.",
    imageHintUrl: null,
    textHint: "Moses prays for awareness of life's brevity to cultivate wisdom in daily living."
  },
  {
    id: "sample-59",
    reference: { book: "Romans", chapter: 3, verse: "23" },
    text: "For all have sinned and fall short of the glory of God.",
    imageHintUrl: null,
    textHint: "Paul declares the universal reality of sin affecting every person."
  },
  {
    id: "sample-60",
    reference: { book: "John", chapter: 11, verse: "25" },
    text: "Jesus said to her, \"I am the resurrection and the life. He who believes in Me, though he may die, he shall live.\"",
    imageHintUrl: null,
    textHint: "Jesus declares His power over death to Martha before raising Lazarus."
  },
  {
    id: "sample-61",
    reference: { book: "1 John", chapter: 5, verse: "14" },
    text: "Now this is the confidence that we have in Him, that if we ask anything according to His will, He hears us.",
    imageHintUrl: null,
    textHint: "John assures believers of God's attentiveness to prayers aligned with His will."
  },
  {
    id: "sample-62",
    reference: { book: "Proverbs", chapter: 17, verse: "22" },
    text: "A merry heart does good, like medicine, but a broken spirit dries the bones.",
    imageHintUrl: null,
    textHint: "Solomon teaches that joy promotes health while despair brings decay."
  },
  {
    id: "sample-63",
    reference: { book: "Psalm", chapter: 121, verse: "1-2" },
    text: "I will lift up my eyes to the hills — from whence comes my help? My help comes from the Lord, who made heaven and earth.",
    imageHintUrl: null,
    textHint: "A pilgrim psalm declaring dependence on God, the Creator, as the sole source of help."
  },
  {
    id: "sample-64",
    reference: { book: "1 John", chapter: 4, verse: "9" },
    text: "In this the love of God was manifested toward us, that God has sent His only begotten Son into the world, that we might live through Him.",
    imageHintUrl: null,
    textHint: "John explains that God's love is revealed through sending Jesus to give us life."
  },
  {
    id: "sample-65",
    reference: { book: "Matthew", chapter: 7, verse: "7" },
    text: "Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you.",
    imageHintUrl: null,
    textHint: "Jesus encourages persistent prayer with the promise that God responds to those who seek Him."
  },
  {
    id: "sample-66",
    reference: { book: "John", chapter: 15, verse: "5" },
    text: "I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing.",
    imageHintUrl: null,
    textHint: "Jesus teaches that spiritual fruitfulness depends entirely on staying connected to Him."
  },
  {
    id: "sample-67",
    reference: { book: "Galatians", chapter: 5, verse: "22-23" },
    text: "But the fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control. Against such there is no law.",
    imageHintUrl: null,
    textHint: "Paul lists the nine qualities produced by the Holy Spirit in a believer's life."
  },
  {
    id: "sample-68",
    reference: { book: "John", chapter: 6, verse: "35" },
    text: "And Jesus said to them, \"I am the bread of life. He who comes to Me shall never hunger, and he who believes in Me shall never thirst.\"",
    imageHintUrl: null,
    textHint: "Jesus declares Himself as the source of ultimate spiritual satisfaction."
  },
  {
    id: "sample-69",
    reference: { book: "Luke", chapter: 15, verse: "10" },
    text: "Likewise, I say to you, there is joy in the presence of the angels of God over one sinner who repents.",
    imageHintUrl: null,
    textHint: "Jesus reveals that heaven celebrates with joy whenever a sinner turns to God."
  },
  {
    id: "sample-70",
    reference: { book: "Proverbs", chapter: 21, verse: "23" },
    text: "Whoever guards his mouth and tongue keeps his soul from troubles.",
    imageHintUrl: null,
    textHint: "Solomon teaches that disciplined speech protects a person from many problems."
  },
  {
    id: "sample-71",
    reference: { book: "John", chapter: 8, verse: "12" },
    text: "Then Jesus spoke to them again, saying, \"I am the light of the world. He who follows Me shall not walk in darkness, but have the light of life.\"",
    imageHintUrl: null,
    textHint: "Jesus declares Himself as the spiritual light that guides believers out of darkness."
  },
  {
    id: "sample-72",
    reference: { book: "Genesis", chapter: 1, verse: "1" },
    text: "In the beginning God created the heavens and the earth.",
    imageHintUrl: null,
    textHint: "The opening words of Scripture declare God as the creator of everything."
  },
  {
    id: "sample-73",
    reference: { book: "Psalm", chapter: 19, verse: "14" },
    text: "Let the words of my mouth and the meditation of my heart be acceptable in Your sight, O Lord, my strength and my Redeemer.",
    imageHintUrl: null,
    textHint: "David prays that both his speech and inner thoughts would please God."
  },
  {
    id: "sample-74",
    reference: { book: "Proverbs", chapter: 22, verse: "6" },
    text: "Train up a child in the way he should go, and when he is old he will not depart from it.",
    imageHintUrl: null,
    textHint: "Solomon teaches that godly parenting leaves a lasting impression on children."
  },
  {
    id: "sample-75",
    reference: { book: "Isaiah", chapter: 26, verse: "3" },
    text: "You will keep him in perfect peace, whose mind is stayed on You, because he trusts in You.",
    imageHintUrl: null,
    textHint: "Isaiah promises that trusting focus on God produces unshakable inner peace."
  },
  {
    id: "sample-76",
    reference: { book: "Isaiah", chapter: 55, verse: "11" },
    text: "So shall My word be that goes forth from My mouth; it shall not return to Me void, but it shall accomplish what I please, and it shall prosper in the thing for which I sent it.",
    imageHintUrl: null,
    textHint: "God declares that His spoken word always accomplishes its intended purpose."
  },
  {
    id: "sample-77",
    reference: { book: "Nahum", chapter: 1, verse: "7" },
    text: "The Lord is good, a stronghold in the day of trouble; and He knows those who trust in Him.",
    imageHintUrl: null,
    textHint: "The prophet describes God as a protective fortress for those who rely on Him."
  },
  {
    id: "sample-78",
    reference: { book: "Matthew", chapter: 6, verse: "34" },
    text: "Therefore do not worry about tomorrow, for tomorrow will worry about its own things. Sufficient for the day is its own trouble.",
    imageHintUrl: null,
    textHint: "Jesus instructs His followers to live one day at a time and not be anxious about the future."
  },
  {
    id: "sample-79",
    reference: { book: "Matthew", chapter: 22, verse: "37-39" },
    text: "Jesus said to him, \"'You shall love the Lord your God with all your heart, with all your soul, and with all your mind.' This is the first and great commandment. And the second is like it: 'You shall love your neighbor as yourself.'\"",
    imageHintUrl: null,
    textHint: "Jesus summarizes the entire law into two commands: love God completely and love others as yourself."
  },
  {
    id: "sample-80",
    reference: { book: "Mark", chapter: 10, verse: "27" },
    text: "But Jesus looked at them and said, \"With men it is impossible, but not with God; for with God all things are possible.\"",
    imageHintUrl: null,
    textHint: "Jesus assures that what seems humanly impossible becomes possible through God's power."
  },
  {
    id: "sample-81",
    reference: { book: "John", chapter: 13, verse: "34-35" },
    text: "A new commandment I give to you, that you love one another; as I have loved you, that you also love one another. By this all will know that you are My disciples, if you have love for one another.",
    imageHintUrl: null,
    textHint: "Jesus gives a new command that selfless love for each other is the mark of true discipleship."
  },
  {
    id: "sample-82",
    reference: { book: "John", chapter: 16, verse: "33" },
    text: "These things I have spoken to you, that in Me you may have peace. In the world you will have tribulation; but be of good cheer, I have overcome the world.",
    imageHintUrl: null,
    textHint: "Jesus warns of worldly trouble but encourages believers with His victory over it all."
  },
  {
    id: "sample-83",
    reference: { book: "Romans", chapter: 8, verse: "1" },
    text: "There is therefore now no condemnation to those who are in Christ Jesus, who do not walk according to the flesh, but according to the Spirit.",
    imageHintUrl: null,
    textHint: "Paul declares that believers in Christ are completely free from guilt and condemnation."
  },
  {
    id: "sample-84",
    reference: { book: "Romans", chapter: 8, verse: "31" },
    text: "What then shall we say to these things? If God is for us, who can be against us?",
    imageHintUrl: null,
    textHint: "Paul asks a rhetorical question affirming that God's support makes believers undefeatable."
  },
  {
    id: "sample-85",
    reference: { book: "Romans", chapter: 8, verse: "38-39" },
    text: "For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come, nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord.",
    imageHintUrl: null,
    textHint: "Paul lists every imaginable force and declares that nothing can break God's love for His people."
  },
  {
    id: "sample-86",
    reference: { book: "1 Corinthians", chapter: 15, verse: "58" },
    text: "Therefore, my beloved brethren, be steadfast, immovable, always abounding in the work of the Lord, knowing that your labor is not in vain in the Lord.",
    imageHintUrl: null,
    textHint: "Paul encourages believers to stand firm because their service to God is never wasted."
  },
  {
    id: "sample-87",
    reference: { book: "2 Corinthians", chapter: 12, verse: "9" },
    text: "And He said to me, \"My grace is sufficient for you, for My strength is made perfect in weakness.\" Therefore most gladly I will rather boast in my infirmities, that the power of Christ may rest upon me.",
    imageHintUrl: null,
    textHint: "God tells Paul that divine power shows up best when human strength runs out."
  },
  {
    id: "sample-88",
    reference: { book: "Galatians", chapter: 6, verse: "9" },
    text: "And let us not grow weary while doing good, for in due season we shall reap if we do not lose heart.",
    imageHintUrl: null,
    textHint: "Paul urges persistence in doing good, promising a harvest for those who don't give up."
  },
  {
    id: "sample-89",
    reference: { book: "Ephesians", chapter: 6, verse: "10-11" },
    text: "Finally, my brethren, be strong in the Lord and in the power of His might. Put on the whole armor of God, that you may be able to stand against the wiles of the devil.",
    imageHintUrl: null,
    textHint: "Paul instructs believers to equip themselves with God's spiritual armor for spiritual warfare."
  },
  {
    id: "sample-90",
    reference: { book: "Philippians", chapter: 1, verse: "6" },
    text: "Being confident of this very thing, that He who has begun a good work in you will complete it until the day of Jesus Christ.",
    imageHintUrl: null,
    textHint: "Paul expresses confidence that God finishes what He starts in every believer's life."
  },
  {
    id: "sample-91",
    reference: { book: "Philippians", chapter: 2, verse: "3-4" },
    text: "Let nothing be done through selfish ambition or conceit, but in lowliness of mind let each esteem others better than himself. Let each of you look out not only for his own interests, but also for the interests of others.",
    imageHintUrl: null,
    textHint: "Paul calls believers to humility by putting others' needs and interests above their own."
  },
  {
    id: "sample-92",
    reference: { book: "Philippians", chapter: 3, verse: "14" },
    text: "I press toward the goal for the prize of the upward call of God in Christ Jesus.",
    imageHintUrl: null,
    textHint: "Paul compares the Christian life to a race, pressing forward toward heaven's reward."
  },
  {
    id: "sample-93",
    reference: { book: "Colossians", chapter: 3, verse: "2" },
    text: "Set your mind on things above, not on things on the earth.",
    imageHintUrl: null,
    textHint: "Paul instructs believers to focus their thoughts on heavenly priorities rather than earthly ones."
  },
  {
    id: "sample-94",
    reference: { book: "1 Thessalonians", chapter: 5, verse: "16-18" },
    text: "Rejoice always, pray without ceasing, in everything give thanks; for this is the will of God in Christ Jesus for you.",
    imageHintUrl: null,
    textHint: "Paul gives three concise commands that capture God's will: joy, prayer, and gratitude."
  },
  {
    id: "sample-95",
    reference: { book: "Hebrews", chapter: 4, verse: "12" },
    text: "For the word of God is living and powerful, and sharper than any two-edged sword, piercing even to the division of soul and spirit, and of joints and marrow, and is a discerner of the thoughts and intents of the heart.",
    imageHintUrl: null,
    textHint: "The author describes Scripture as a living, penetrating force that exposes inner motives."
  },
  {
    id: "sample-96",
    reference: { book: "Hebrews", chapter: 13, verse: "8" },
    text: "Jesus Christ is the same yesterday, today, and forever.",
    imageHintUrl: null,
    textHint: "A declaration that Jesus is unchanging and consistent across all time."
  },
  {
    id: "sample-97",
    reference: { book: "James", chapter: 4, verse: "7" },
    text: "Therefore submit to God. Resist the devil and he will flee from you.",
    imageHintUrl: null,
    textHint: "James teaches that surrendering to God and standing against evil causes the enemy to retreat."
  },
  {
    id: "sample-98",
    reference: { book: "1 Peter", chapter: 3, verse: "15" },
    text: "But sanctify the Lord God in your hearts, and always be ready to give a defense to everyone who asks you a reason for the hope that is in you, with meekness and fear.",
    imageHintUrl: null,
    textHint: "Peter calls believers to be prepared to explain their faith with gentleness and respect."
  },
  {
    id: "sample-99",
    reference: { book: "2 Chronicles", chapter: 7, verse: "14" },
    text: "If My people who are called by My name will humble themselves, and pray and seek My face, and turn from their wicked ways, then I will hear from heaven, and will forgive their sin and heal their land.",
    imageHintUrl: null,
    textHint: "God promises national restoration when His people humbly repent and seek Him."
  },
  {
    id: "sample-100",
    reference: { book: "Psalm", chapter: 23, verse: "4" },
    text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil; for You are with me; Your rod and Your staff, they comfort me.",
    imageHintUrl: null,
    textHint: "David finds courage in God's presence even in life's darkest and most dangerous moments."
  }
];
