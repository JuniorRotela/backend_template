import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export type ProductUnitType = 'unit' | 'weight';

@Entity('stock_products')
export class StockProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 80, default: 'General' })
  category: string;

  // 'unit' = se controla por unidades | 'weight' = se controla por gramos
  @Column({ type: 'enum', enum: ['unit', 'weight'], default: 'unit' })
  unit_type: ProductUnitType;

  // Stock actual. Si unit_type = 'weight', está en gramos.
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  stock_quantity: number;

  // Stock mínimo de alerta (misma unidad base: unidades o gramos)
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  min_stock: number;

  // Costo por unidad base (unidad o kg)
  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  cost_price: number;

  @Column({ length: 100, nullable: true })
  supplier: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}