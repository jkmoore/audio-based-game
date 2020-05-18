const STARTX = 500;
const MAX = 100000;

class Obstacle
{
  constructor(vals)
  {
    if(vals != undefined)
    {
      this.x = vals[0];        //position on a single horizontal axis
      this.canDestr = vals[1]; //destructible or not
      this.maxFreq = vals[2];  //highest frequency allowed to destroy it
      this.minFreq = vals[3];  //lowest frequency allowed to destroy it
      this.maxVol = vals[4];   //highest volume allowed to destroy it
      this.minVol = vals[5];   //lowest volume allowed to destroy it
    }
    else
    {
      this.x = STARTX;
      this.canDestr = false;
      this.maxFreq = MAX;
      this.minFreq = 0;
      this.maxVol = MAX;
      this.minVol = 0;
    }
  }

  //Sets obstacle data to the values in the provided array
  setVals(vals)
  {
    this.x = vals[0];        //position on a single horizontal axis
    this.canDestr = vals[1]; //destructible or not
    this.maxFreq = vals[2];  //highest frequency allowed to destroy it
    this.minFreq = vals[3];  //lowest frequency allowed to destroy it
    this.maxVol = vals[4];   //highest volume allowed to destroy it
    this.minVol = vals[5];   //lowest volume allowed to destroy it
  }

  //Return obstacle data
  getX() {return this.x}
  getCanDestr() {return this.canDestr}
  getMaxFreq() {return this.maxFreq}
  getMinFreq() {return this.minFreq}
  getMaxVol() {return this.maxVol}
  getMinVol() {return this.minVol}

  //Determines whether audio with the given frequency and volume can destroy the obstacle
  audioInRange(freq, vol)
  {
    if (freq >= minFreq && freq <= maxFreq && vol >= minVol && vol <= maxVol)
      return true;
    return false;
  }
}

