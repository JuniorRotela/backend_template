import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export type ProductUnitType = 'unit' | 'kg' | 'g' | 'ml' | 'weight';

@Entity('stock_products')
export class StockProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 80, default: 'General' })
  category: string;

  // 'unit' = unidades | 'kg' = kilogramos (stock en gramos) | 'g' = gramos | 'ml' = mililitros | 'weight' = legacy (gramos)
  @Column({ type: 'enum', enum: ['unit', 'kg', 'g', 'ml', 'weight'], default: 'unit' })
  unit_type: ProductUnitType;

  // Stock actual en la unidad base: unidades para 'unit', gramos para 'kg'/'g'/'weight', mililitros para 'ml'.
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  stock_quantity: number;

  // Stock mínimo de alerta (misma unidad base)
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  min_stock: number;

  // Costo por unidad de presentación (unidad, kg, g o ml según unit_type)
  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  cost_price: number;

  // Precio de venta por unidad de presentación
  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  sale_price: number;

  @Column({ length: 100, nullable: true })
  supplier: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}