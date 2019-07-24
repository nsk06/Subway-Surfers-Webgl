document.onkeypress = function (e) {
    e = e || window.event;
    if(e.key=='a' )
    {
		console.log('a pressed');
		if (posx == 0)
		{
			posx = -3
		}
		else if (posx == 3)
		{
			posx = 0
		}
    }
    else if(e.key=='d')
    { 
		console.log('d pressed');
		if (posx == 0)
		{
			posx = 3
		}
		else if (posx == -3)
		{
			posx = 0
		}
	}
	else if(e.key == 'w')
	{
		console.log('w pressed');
		if(duck == false)
		{
		duck = true
		}
	}
	else if(e.key == 'b')
	{
		console.log('B pressed');
		mygrayscale = !mygrayscale;
	}
};
document.onkeydown = function (e) {
	e = e || window.event;
	if (e.keyCode == 37)
	{
		console.log('left');
		if (posx == 0)
		{
			posx = -3
		}
		else if (posx == 3)
		{
			posx = 0
		}
	}
	else if(e.keyCode == 39)
	{
		console.log('right');
		if (posx == 0)
		{
			posx = 3
		}
		else if (posx == -3)
		{
			posx = 0
		}
	}
	else if (e.keyCode == 32)
	{
		console.log('space')
		if(jump_check == false)
		{
			jump_check = true;
		}
	}
};	