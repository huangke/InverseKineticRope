
const {ccclass} = cc._decorator;

@ccclass
export default class Segment {
    a: cc.Vec2 = null;
    b: cc.Vec2 = null;
    len: number = 0.0;
    angle: number = 0.0;

    public initBuyParent (parent:Segment, len:number, angle:number) {
        this.a = new cc.Vec2(parent.b.x, parent.b.y);
        this.len = len;
        this.angle = angle;
        this.caculateB();
    }

    public init(x:number,y:number,len:number,angle:number) {
        this.a =  new cc.Vec2(x,y);
        this.len = len;
        this.angle = angle;
        this.caculateB();
    }

    public SetA(a:cc.Vec2) {
        this.a = a;
        this.caculateB();
    }
 
    public Follow(pos:cc.Vec2) {
        // let a = pos - a;
        let oldPos = pos;
        let newPos = pos.sub(this.a);
        let dir = new cc.Vec3(newPos.x, newPos.y, 0);
        dir = dir.normalizeSelf();
        this.angle = Math.atan2(dir.y,dir.x);
        dir = dir.mul(this.len * -1.0);
        this.a = oldPos.add(new cc.Vec2(dir.x,dir.y));
    }
 
    public Show() {
        // Gizmos.DrawLine(a,b);
        // Gizmos.DrawSphere(a,len*0.1f);
    }

    public GetA() {
        return this.a;
    }

    public GetB() {
        return this.b;
    }
 
    public caculateB() {
        let dx = this.len * Math.cos(this.angle);
        let dy = this.len * Math.sin(this.angle);
        this.b = new cc.Vec2(this.a.x + dx, this.a.y + dy);
    }
 
    public update() {
        this.caculateB();
    }
}