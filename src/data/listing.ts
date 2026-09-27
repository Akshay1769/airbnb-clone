export type ListingImage = {
  id: string;
  src: string;
  alt: string;
  room: string;
};

export type ListingPhotoGroup = {
  title: string;
  description: string;
  photoIds: string[];
};

export type Listing = {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  host: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  nightlyPrice: number;
  totalPrice: number;
  images: ListingImage[];
  heroPhotoIds: string[];
  photoGroups: ListingPhotoGroup[];
  amenities: string[];
  reviewsList: { name: string; tenure: string; date: string; text: string }[];
};

const image = (id: string, room: string, label?: string): ListingImage => ({
  id,
  src: `/images/${id}.jpeg`,
  alt: label ?? `${room} photo`,
  room,
});

const livingRoomOne = [
  image("a9831aeb-f441-44f5-a38f-4cf54e3f0fcf", "Living room 1", "Living room 1 1"),
  image("a45feaa2-b607-4092-83ac-5fd4b2894959", "Living room 1", "Living room 1 2"),
  image("f1da1c3d-0d10-481e-9b63-c71f9073f30b", "Living room 1", "Living room 1 3"),
];

const livingRoomTwo = [
  image("090d8b0b-b539-42c0-84f8-e1fb0cdf9a93", "Living room 2", "Living room 2 1"),
  image("9be71047-fc52-438a-9270-75cb470f6752", "Living room 2", "Living room 2 2"),
  image("f6de1663-4e9c-4414-b63b-29a154a92ee1", "Living room 2", "Living room 2 3"),
  image("2367476f-11c4-4a14-a7c6-267be62c1d59", "Living room 2", "Living room 2 4"),
  image("67c61c6f-6260-4809-9510-0360e58a345d", "Living room 2", "Living room 2 5"),
  image("34529829-a971-44d3-ac2f-90ea3678a34d", "Living room 2", "Living room 2 6"),
  image("153aa732-4935-48b8-a6fe-b469b6af5efc", "Living room 2", "Living room 2 7"),
  image("3c6e6809-1bb1-47a6-8e24-aff593e1c28f", "Living room 2", "Living room 2 8"),
];

const kitchen = [
  image("56c44812-52c0-4481-90d8-101ec1f34c7a", "Full kitchen", "Full kitchen 1"),
  image("ddc853d7-e658-405c-bedc-8f31106c447e", "Full kitchen", "Full kitchen 2"),
];

const bedroom = [
  image("1c827136-4a85-4fe0-8e69-3fd8ea19bb17", "Bedroom", "Bedroom 1"),
  image("0622ab42-b851-4d55-9d9f-df3143bc5909", "Bedroom", "Bedroom 2"),
  image("a74e3c0b-3188-4442-9146-1cd4d6ea45df", "Bedroom", "Bedroom 3"),
  image("48a8ffbc-fbf7-4f84-bc29-ee400da3f08b", "Bedroom", "Bedroom 4"),
  image("3cf31697-f3f3-4c60-82c4-029acb119ae4", "Bedroom", "Bedroom 5"),
];

const bathroom = [
  image("97c78f8a-5090-4663-aebc-ba4e13b47092", "Full bathroom", "Full bathroom"),
];

const gym = [
  image("9aa8e65f-94ac-4ba0-9a10-9ec91e536d22", "Gym", "Gym 1"),
  image("246bd88d-4dd6-4117-a401-02a36ebfcf16", "Gym", "Gym 2"),
  image("4fede77d-7a71-446f-89e3-263af937f3fa", "Gym", "Gym 3"),
  image("79f59adb-5a5f-4d6c-8109-1f01f4ca0d03", "Gym", "Gym 4"),
  image("f19d8c0a-1d88-42a4-9218-686d4f0db7e4", "Gym", "Gym 5"),
];

const exterior = [
  image("23ea6621-6f74-4baa-acea-2fd03e312b41", "Exterior", "Exterior 1"),
  image("5adfdf3e-d497-4efc-ab8c-fc559dab311e", "Exterior", "Exterior 2"),
  image("608748cd-6ee7-4a71-88a2-ba79d3ddba5a", "Exterior", "Exterior 3"),
  image("5b856fde-a393-41bf-b373-c9d02e64221f", "Exterior", "Exterior 4"),
  image("c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d", "Exterior", "Exterior 5"),
  image("42befad7-fb29-473d-91db-b03e7a544d1d", "Exterior", "Exterior 6"),
];

const pool = [
  image("fc02f48f-a937-42c5-895d-f9cc3113d6ca", "Pool", "Pool 1"),
  image("929545d3-e241-46c0-8a70-c24531ce7b54", "Pool", "Pool 2"),
  image("8eb65a8b-e795-4870-b141-6f63b1be24ae", "Pool", "Pool 3"),
];

const additional = [
  image("70325367-cbae-4993-b560-18cd3f6edd53", "Additional photos", "Additional photos 1"),
  image("cc7a56bd-242c-498a-9aef-0cffac619e54", "Additional photos", "Additional photos 2"),
  image("30ad93b2-293f-494d-b645-626303c6cb93", "Additional photos", "Additional photos 3"),
  image("9642a60d-e9de-4e1a-89c2-9ebd230f4a74", "Additional photos", "Additional photos 4"),
  image("b6599f26-d65c-4df0-baf2-ef18c82a86a3", "Additional photos", "Additional photos 5"),
  image("dc01fd46-b119-48d3-a43b-f6c093e26eca", "Additional photos", "Additional photos 6"),
  image("fe37b80e-da8a-4225-b27b-dfbb5d763c01", "Additional photos", "Additional photos 7"),
  image("3c90338e-86b4-423f-aae1-279e0ccc3a18", "Additional photos", "Additional photos 8"),
  image("862d936c-0f34-4e50-af87-b519e2781d19", "Additional photos", "Additional photos 9"),
  image("79addceb-8c2d-419b-80ff-e29af426a94c", "Additional photos", "Additional photos 10"),
];

const photoGroups: ListingPhotoGroup[] = [
  { title: "Living room 1", description: "Sofa · Air conditioning · Ceiling fan · TV", photoIds: livingRoomOne.map(({ id }) => id) },
  { title: "Living room 2", description: "Sofa · Air conditioning · Ceiling fan", photoIds: livingRoomTwo.map(({ id }) => id) },
  { title: "Full kitchen", description: "Fridge · Microwave · Cooking basics · Kettle", photoIds: kitchen.map(({ id }) => id) },
  { title: "Bedroom", description: "1 double bed · Air conditioning · Room-darkening blinds", photoIds: bedroom.map(({ id }) => id) },
  { title: "Full bathroom", description: "Hot tub · Shower", photoIds: bathroom.map(({ id }) => id) },
  { title: "Gym", description: "Exercise equipment", photoIds: gym.map(({ id }) => id) },
  { title: "Exterior", description: "", photoIds: exterior.map(({ id }) => id) },
  { title: "Pool", description: "Outdoor pool", photoIds: pool.map(({ id }) => id) },
  { title: "Additional photos", description: "", photoIds: additional.map(({ id }) => id) },
];

export const listing: Listing = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  location: "Candolim, Goa, India",
  rating: 4.95,
  reviews: 19,
  host: "Mirashya Homes",
  guests: 3,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  nightlyPrice: 5_700,
  totalPrice: 28_499,
  images: [...livingRoomOne, ...livingRoomTwo, ...kitchen, ...bedroom, ...bathroom, ...gym, ...exterior, ...pool, ...additional],
  heroPhotoIds: [
    "2367476f-11c4-4a14-a7c6-267be62c1d59",
    "090d8b0b-b539-42c0-84f8-e1fb0cdf9a93",
    "9be71047-fc52-438a-9270-75cb470f6752",
    "67c61c6f-6260-4809-9510-0360e58a345d",
    "c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d",
  ],
  photoGroups,
  amenities: [
    "Kitchen",
    "Wifi",
    "Dedicated workspace",
    "Free parking on premises",
    "Pool",
    "Hot tub",
    "Pets allowed",
    "Exterior security cameras on property",
    "Carbon monoxide alarm",
    "Smoke alarm",
    "Air conditioning",
    "Ceiling fan",
    "TV",
    "Refrigerator",
    "Microwave",
    "Cooking basics",
    "Kettle",
    "Patio or balcony",
    "Outdoor dining area",
    "Gym",
  ],
  reviewsList: [
    { name: "Amit", tenure: "2 months on Airbnb", date: "1 week ago", text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property." },
    { name: "Aheesh", tenure: "3 years on Airbnb", date: "2 weeks ago", text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again." },
    { name: "Samiksha", tenure: "8 months on Airbnb", date: "May 2026", text: "the host nitish was really great help" },
    { name: "Vedant", tenure: "4 years on Airbnb", date: "May 2026", text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine. The highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!" },
    { name: "Vaibhav S", tenure: "3 years on Airbnb", date: "May 2026", text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too." },
    { name: "Mohd", tenure: "5 years on Airbnb", date: "May 2026", text: "Great place. Exactly as described in the listing." },
  ],
};
