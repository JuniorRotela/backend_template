import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { StockProduct } from "./StockProduct";

export type MovementType = 'purchase_in' | 'sale_out' | 'loss_out' | 'adjustment';

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => StockProduct)
  @JoinColumn({ name: 'product_id' })
  product: StockProduct;

  // purchase_in (+) | sale_out (-) | loss_out (-) | adjustment (+/-)
  @Column({ type: 'enum', enum: ['purchase_in', 'sale_out', 'loss_out', 'adjustment'] })
  type: MovementType;

  // Cantidad en unidad base (unidades o gramos), con signo
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  quantity: number;

  // Origen del movimiento: 'store' | 'gourmet' | 'online' | 'purchase' | 'loss' | 'manual'
  @Column({ length: 30, nullable: true })
  reference_type: string;

  @Column({ length: 120, nullable: true })
  reference_id: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;
}