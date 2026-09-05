import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { StockProduct } from "./StockProduct";

@Entity('stock_losses')
export class StockLoss {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => StockProduct)
  @JoinColumn({ name: 'product_id' })
  product: StockProduct;

  // Cantidad perdida en unidad base (unidades o gramos)
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  quantity: number;

  @Column({ length: 200, nullable: true })
  reason: string;

  @Column({ type: 'date' })
  loss_date: string;

  @CreateDateColumn()
  created_at: Date;
}