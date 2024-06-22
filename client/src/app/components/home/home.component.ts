import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Card1Component } from '../shares/card-1/card-1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Card1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  intervalId: any;
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngAfterViewInit() {
    this.addMouseMoveListener();
    this.initializeSlider();
  }

  ngOnDestroy() {
    this.removeMouseMoveListener();
    this.cleanupSlider();
  }

  addMouseMoveListener() {
    const container = document.querySelector('.amazing-img-container');
    const amazingImg = document.querySelector('.amazing-img');

    if (container && amazingImg) {
      container.addEventListener('mousemove', this.handleMouseMove as EventListener);
    }
  }

  removeMouseMoveListener() {
    const container = document.querySelector('.amazing-img-container');
    if (container) {
      container.removeEventListener('mousemove', this.handleMouseMove as EventListener);
    }
  }

  handleMouseMove = (e: MouseEvent) => {
    const container = e.currentTarget as HTMLElement;
    const amazingImg = container.querySelector('.amazing-img');

    if (container && amazingImg) {
      const mouseX = e.clientX - container.offsetLeft;
      const mouseY = e.clientY - container.offsetTop;
  
      // Tính toán giá trị mới cho background-position
      const bgPosX = (mouseX / container.clientWidth) * 100;
      const bgPosY = (mouseY / container.clientHeight) * 100;
  
      // Áp dụng giá trị mới cho background-position
      (amazingImg as HTMLElement).style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    }
  }

  initializeSlider() {
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');

    if (nextButton && prevButton) {
      nextButton.addEventListener('click', this.handleNextClick);
      prevButton.addEventListener('click', this.handlePrevClick);
    }

    this.intervalId = setInterval(this.autoChangeSlide, 20000);
  }

  cleanupSlider() {
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');

    if (nextButton && prevButton) {
      nextButton.removeEventListener('click', this.handleNextClick);
      prevButton.removeEventListener('click', this.handlePrevClick);
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  handleNextClick = () => {
    const items = document.querySelectorAll('.item');
    const sliderContent = document.querySelector('.amazing-slider-content');
    if (sliderContent && items.length > 0) {
      sliderContent.appendChild(items[0]);
    }
  }

  handlePrevClick = () => {
    const items = document.querySelectorAll('.item');
    const sliderContent = document.querySelector('.amazing-slider-content');
    if (sliderContent && items.length > 0) {
      sliderContent.prepend(items[items.length - 1]);
    }
  }

  autoChangeSlide = () => {
    const items = document.querySelectorAll('.item');
    const sliderContent = document.querySelector('.amazing-slider-content');
    if (sliderContent && items.length > 0) {
      sliderContent.appendChild(items[0]);
    }
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      {
        next: (response) => {
          this.categories = response.data || [];
        },
        error: (error) => {
        },
        complete: () => {
        }
      }
    );
  }
}
