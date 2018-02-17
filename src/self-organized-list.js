class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.n=0;
    }

    insert(data) {
        var newNode=new Node(data);
        if(this.head==null||this.tail==null)
        {
            this.head=newNode;
            this.tail=newNode;
        }
        else 
        {
            this.tail.next=newNode;
            newNode.prev=this.tail;
            this.tail=newNode;
        }
        this.n++;
    }

    size() {
        return this.n;
    }

    at(index) {
        if(this.size() == 0||index>this.size())
            return null;
        var tempNode=this.head;
        for(var i=0; i<index; i++)
            tempNode=tempNode.next;
        return tempNode.data;
    }

    findNode(data) {
        var tempNode=this.head;
        for(var i=0; i<this.n; i++)
            if(tempNode.data==data)
                return tempNode;
            else
                tempNode=tempNode.next;
            return null;
    }

    toArray() {
        var arr=new Array(this.n);
        var tempNode = this.head;
        for(var i=0; i<this.n; i++)
        {
            arr[i]=tempNode.data;
            tempNode=tempNode.next;
        }
        return arr;
    }

    removeAt(index) {
        if(this.size() == 0||this.size() <= index)
            return;
        if(this.size() == 1&&index == 0)
        {
            this.head = null;
            this.tail = null;
            this.n = 0;
            return;
        }
        var tempNode = this.head;
        for(var i = 0; i< index; i++)
            tempNode=tempNode.next;
        if(index!=0)
            tempNode.prev.next=tempNode.next;
        else
        {
            tempNode.next.prev = null;
            this.head = tempNode.next; 
        }
        if(index != this.n-1)
        tempNode.next.prev=tempNode.prev;
        else
        {
            tempNode.prev.next = null;
            this.tail = tempNode.prev; 
        }
        this.n--;
    }

    moveToFront(node){
        if(this.size() == 1 || this.size() == 0 || this.head == node)
            return;
        node.prev.next = node.next;
        if(node.next != null)
            node.next.prev = node.prev;
        else 
            this.tail = node.prev;
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    reorganize(data) {
        if(this.n==0)
            return false;
        var tempNode = this.findNode(data);
        if(tempNode==null)
            return false;
        else
        {
            this.moveToFront(tempNode);
            return true;
        }
    }

}

module.exports = {
    SelfOrganizedList,
    Node
};
