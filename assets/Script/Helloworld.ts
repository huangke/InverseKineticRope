import Segment from "./Segment"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Graphics)
    ctx: cc.Graphics = null;

    mousePosition: cc.Vec2 = cc.Vec2.ZERO;

    segments: Array<Segment> = null;

    segmentCount: number = 100;
    segmentLength: number = 2;
    segmentAngle: number = Math.PI;
    startPos: cc.Vec2 = new cc.Vec2(100,100);
    start () {

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            let touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

            this.points = [touchLoc];

            return true;
        }, this);
          
        
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
            
            this.mousePosition = new cc.Vec2(touchLoc.x, touchLoc.y);
        }, this);
    }

    update () {
        if (this.segments == null)
        {
            this.segments = [];
            for (let i = 0; i < this.segmentCount; i++)
            {
                if (i == 0)
                {
                    let seg = new Segment();
                    seg.init(this.startPos.x, this.startPos.y, this.segmentLength, this.segmentAngle);    
                    this.segments.push(seg);
                }
                else
                {
                    let seg = new Segment();
                    seg.initBuyParent(this.segments[i-1],this.segmentLength,this.segmentAngle);
                    this.segments.push(seg);
                }
            }
        }
            
        for (let i = this.segments.length - 1; i >= 0; i--)
        {
                if (i == this.segments.length - 1)
                {
                    this.segments[i].Follow(this.mousePosition);
                }
                else
                {
                    this.segments[i].Follow(this.segments[i+1].a);
                }
                this.segments[i].update();
         }
 
        this.segments[0].SetA(this.startPos);
        this.segments[0].update();
        
        for (let i = 1; i < this.segments.length; i++)
        {    
            this.segments[i].SetA(this.segments[i-1].b);
            this.segments[i].update();
        }
        
        this.ctx.clear();
        for (let i = 0; i < this.segments.length; i++)
        {
            this.segments[i].Show();
            let p = this.segments[i];
            if (i === 0) {
                this.ctx.moveTo(p.GetA().x, p.GetA().y);
                this.ctx.lineTo(p.GetB().x, p.GetB().y);
                // this.ctx.circle(p.GetA().x, p.GetA().y,2);
                // this.ctx.circle(p.GetB().x, p.GetB().y,2);
            } else {
                this.ctx.lineTo(p.GetB().x, p.GetB().y);
                // cc.log("line to x " + p.GetB().x + " y " + p.GetB().y);
                // this.ctx.circle(p.GetB().x, p.GetB().y,2);
            }    
            
        }
        this.ctx.stroke();
    }
}
