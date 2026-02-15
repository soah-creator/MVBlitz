// Sample Bible verses with hints for MemBlitz (NKJV)
const SAMPLE_VERSES = [
  {
    id: "sample-1",
    reference: { book: "John", chapter: 3, verse: "16" },
    text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    imageHintUrl: "https://images.unsplash.com/photo-1499652848871-1527a310b13a?w=400",
    textHint: "This verse, often called the 'Gospel in a nutshell,' summarizes God's love for humanity and the gift of salvation through Jesus Christ."
  },
  {
    id: "sample-2",
    reference: { book: "Philippians", chapter: 4, verse: "13" },
    text: "I can do all things through Christ who strengthens me.",
    imageHintUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400",
    textHint: "Paul wrote this while in prison, showing that true strength comes from Christ regardless of circumstances."
  },
  {
    id: "sample-3",
    reference: { book: "Jeremiah", chapter: 29, verse: "11" },
    text: "For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope.",
    imageHintUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
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
    imageHintUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
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
    imageHintUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400",
    textHint: "God spoke these words to Joshua as he was about to lead Israel into the Promised Land after Moses' death."
  },
  {
    id: "sample-9",
    reference: { book: "Psalm", chapter: 119, verse: "105" },
    text: "Your word is a lamp to my feet and a light to my path.",
    imageHintUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400",
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
    imageHintUrl: "https://images.unsplash.com/photo-1445633629932-0029acc44e88?w=400",
    textHint: "Paul describes the believer's identification with Christ's death and the new life that results from faith."
  },
  {
    id: "sample-12",
    reference: { book: "Hebrews", chapter: 11, verse: "1" },
    text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    imageHintUrl: "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=400",
    textHint: "This verse provides the biblical definition of faith at the beginning of the 'Hall of Faith' chapter."
  },
  {
    id: "sample-13",
    reference: { book: "Romans", chapter: 12, verse: "2" },
    text: "And do not be conformed to this world, but be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God.",
    imageHintUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
    textHint: "Paul urges believers to reject worldly patterns and embrace spiritual transformation through renewed thinking."
  },
  {
    id: "sample-14",
    reference: { book: "2 Timothy", chapter: 1, verse: "7" },
    text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    imageHintUrl: "https://images.unsplash.com/photo-1490730141103-6cac27abb37f?w=400",
    textHint: "Paul encourages Timothy that God empowers believers with courage, love, and self-discipline rather than fear."
  },
  {
    id: "sample-15",
    reference: { book: "1 Corinthians", chapter: 10, verse: "13" },
    text: "No temptation has overtaken you except such as is common to man; but God is faithful, who will not allow you to be tempted beyond what you are able, but with the temptation will also make the way of escape, that you may be able to bear it.",
    imageHintUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    textHint: "Paul assures believers that God limits temptation and always provides a way out."
  },
  {
    id: "sample-16",
    reference: { book: "Ephesians", chapter: 2, verse: "8-9" },
    text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast.",
    imageHintUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400",
    textHint: "Paul explains that salvation is entirely a gift from God, not earned by human effort."
  },
  {
    id: "sample-17",
    reference: { book: "1 John", chapter: 1, verse: "9" },
    text: "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
    imageHintUrl: "https://images.unsplash.com/photo-1473172707857-f9e276582ab6?w=400",
    textHint: "John assures believers of God's promise to forgive when we honestly confess our sins."
  },
  {
    id: "sample-18",
    reference: { book: "Matthew", chapter: 6, verse: "33" },
    text: "But seek first the kingdom of God and His righteousness, and all these things shall be added to you.",
    imageHintUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    textHint: "Jesus teaches that prioritizing God's kingdom leads to provision for all other needs."
  },
  {
    id: "sample-19",
    reference: { book: "Psalm", chapter: 46, verse: "10" },
    text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth!",
    imageHintUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    textHint: "God calls believers to quiet trust, reminding them of His sovereign control over all nations."
  },
  {
    id: "sample-20",
    reference: { book: "Romans", chapter: 10, verse: "9" },
    text: "that if you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved.",
    imageHintUrl: "https://images.unsplash.com/photo-1445633629932-0029acc44e88?w=400",
    textHint: "Paul outlines the simple requirements for salvation: verbal confession and heartfelt belief in Jesus' resurrection."
  }
];
