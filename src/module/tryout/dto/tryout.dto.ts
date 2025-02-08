export interface ITryoutItemDto {
  id: string;
  title: string;
  totalItem: number;
  totalTime: number;
  rating: number;
  review: number;
  categoryId: string;
}

export interface ITryoutCategoryDto {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}
