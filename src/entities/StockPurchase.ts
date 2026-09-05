import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { StockPurchaseItem } from "./StockPurchaseItem";

@Entity('stock_purchases')
export class StockPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, nullable: true })
  supplier: string;

  @Column({ type: 'date' })
  purchase_date: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  total_cost: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => StockPurchaseItem, item => item.purchase)
  items: StockPurchaseItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}