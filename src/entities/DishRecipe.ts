import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { StockProduct } from "./StockProduct";

@Entity('dish_recipes')
export class DishRecipe {
  @PrimaryGeneratedColumn()
  id: number;

  // ID del plato en Supabase (dishes.id) — se guarda como string
  @Column({ length: 100 })
  dish_id: string;

  @Column()
  product_id: number;

  @ManyToOne(() => StockProduct)
  @JoinColumn({ name: 'product_id' })
  product: StockProduct;

  // Cantidad de ingrediente por plato en unidad base (unidades o gramos)
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
}