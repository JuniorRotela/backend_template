import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { StockPurchase } from "./StockPurchase";
import { StockProduct } from "./StockProduct";

@Entity('stock_purchase_items')
export class StockPurchaseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purchase_id: number;

  @ManyToOne(() => StockPurchase)
  @JoinColumn({ name: 'purchase_id' })
  purchase: StockPurchase;

  @Column()
  product_id: number;

  @ManyToOne(() => StockProduct)
  @JoinColumn({ name: 'product_id' })
  product: StockProduct;

  // Cantidad comprada en unidad base (unidades o gramos)
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  quantity: number;

  // Costo por unidad base (unidad o kg)
  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  unit_cost: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  total_cost: number;

  @CreateDateColumn()
  created_at: Date;
}