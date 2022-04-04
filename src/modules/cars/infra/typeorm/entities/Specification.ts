import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("specifications")
class Specification {
  @Column()
  name: string;

  @Column()
  description: string;

  @PrimaryColumn()
  id?: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Specification };
