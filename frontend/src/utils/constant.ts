export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    weight: string;
  }
  
  export const products: Product[] = [
    {
      id: "1",
      name: "Whey Protein Isolate",
      price: 2499,
      image: "https://imgs.search.brave.com/93h2_VHuyOTqqikHgaNobr2Fv0DdGmZEKPXCWhsU4Qg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mYW1v/dXNudXRyaXRpb24u/Y29tL2Nkbi9zaG9w/L2ZpbGVzL3Byb3Rl/aW4tY3JlYXRpbmUt/Y2hvY29sYXRlLXBk/cC5qcGc_dj0xNzMw/MDY3MDY2JndpZHRo/PTIwMDA",
      description: "Premium whey protein isolate for muscle building",
      weight: "1kg"
    },
    {
      id: "2", 
      name: "Casein Protein",
      price: 2199,
      image: "https://imgs.search.brave.com/Brz-D6-nKhfCatkv8dCn4yzQs_WZNbe1OyLNQCawUco/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dHJhbnNwYXJlbnRs/YWJzLmNvbS9jZG4v/c2hvcC9hcnRpY2xl/cy9pbWctMTcxMjI0/Nzk1MzIzOF8yOGYw/N2FiZC0xMmRlLTQ0/YjktODQxMy1jN2Fl/NzU0NTk1NDRfMTIw/MHgxMjAwLnBuZz92/PTE3NDc4NDc4MzU",
      description: "Slow-release protein for overnight recovery",
      weight: "1kg"
    },
    {
      id: "3",
      name: "Mass Gainer",
      price: 1899,
      image: "https://imgs.search.brave.com/Brz-D6-nKhfCatkv8dCn4yzQs_WZNbe1OyLNQCawUco/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dHJhbnNwYXJlbnRs/YWJzLmNvbS9jZG4v/c2hvcC9hcnRpY2xl/cy9pbWctMTcxMjI0/Nzk1MzIzOF8yOGYw/N2FiZC0xMmRlLTQ0/YjktODQxMy1jN2Fl/NzU0NTk1NDRfMTIw/MHgxMjAwLnBuZz92/PTE3NDc4NDc4MzU",
      description: "High-calorie mass gainer for weight gain",
      weight: "1kg"
    },
    {
      id: "4",
      name: "BCAA Powder",
      price: 1299,
      image: "https://via.placeholder.com/300x300/7C3AED/ffffff?text=BCAA+Powder",
      description: "Essential amino acids for muscle recovery",
      weight: "300g"
    },
    {
      id: "5",
      name: "Creatine Monohydrate",
      price: 999,
      image: "https://via.placeholder.com/300x300/F59E0B/ffffff?text=Creatine",
      description: "Pure creatine for strength and power",
      weight: "250g"
    },
    {
      id: "6",
      name: "Pre-Workout",
      price: 1599,
      image: "https://via.placeholder.com/300x300/EF4444/ffffff?text=Pre+Workout",
      description: "Energy boost for intense workouts",
      weight: "300g"
    }
  ];