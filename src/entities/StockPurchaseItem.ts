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

  // Cantidad comprada en unidad base (unidades para unit/package, gramos para kg/g/weight, ml para ml)
  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  quantity: number;

  // Costo por unidad de presentación (unidad, kg, g, ml o paquete según unit_type)
  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  unit_cost: number;

  // Total de la línea (quantity * unit_cost)
  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  total_cost: number;

  // Si es un paquete: cuántos paquetes se compraron
  @Column({ type: 'int', nullable: true })
  packages_count: number;

  // Si es un paquete: cuántas unidades sueltas trae cada paquete en esta compra
  @Column({ type: 'int', nullable: true })
  units_per_package: number;

  @CreateDateColumn()
  created_at: Date;
}