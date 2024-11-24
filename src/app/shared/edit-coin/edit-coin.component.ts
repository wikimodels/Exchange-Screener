import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coin } from 'models/coin/coin';
import { CoinUpdateData } from 'models/coin/coin-update-data';
import { Status } from 'models/coin/status';

import { CoinsGenericService } from 'src/service/coins/coins-generic.service';

@Component({
  selector: 'app-edit-coin',
  templateUrl: './edit-coin.component.html',
  styleUrls: ['./edit-coin.component.css'],
})
export class EditCoinComponent implements OnInit {
  // Available status options
  coin!: Coin;
  statusOptions: string[] = Object.values(Status);
  initialStatus!: Status;
  // Selected status
  selectedStatus: string = '';

  leftColumnProperties = [
    {
      logo: 'cmc.svg',
      label: 'Market Cap Rank',
      value: this.data.coin.market_cap_rank,
    },
    {
      logo: 'cmc.svg',
      label: 'Market Cap FDV Ratio',
      value: this.data.coin.market_cap_fdv_ratio,
    },
    {
      logo: 'facebook.svg',
      label: 'Facebook Likes',
      value: this.data.coin.facebook_likes,
    },
    {
      logo: 'twitter.svg',
      label: 'Twitter Followers',
      value: this.data.coin.twitter_followers,
    },
    {
      logo: 'reddit.svg',
      label: 'Reddit Subscribers',
      value: this.data.coin.reddit_subscribers,
    },
  ];

  rightColumnProperties = [
    {
      logo: 'telegram.svg',
      label: 'Telegram Users',
      value: this.data.coin.telegram_channel_user_count,
    },
    {
      logo: 'github.svg',
      label: 'GitHub Forks',
      value: this.data.coin.gh_forks,
    },
    {
      logo: 'github.svg',
      label: 'GitHub Stars',
      value: this.data.coin.gh_stars,
    },
    {
      logo: 'github.svg',
      label: 'GitHub Subscribers',
      value: this.data.coin.gh_subscribers,
    },
    {
      logo: 'github.svg',
      label: 'GitHub Issues',
      value: this.data.coin.gh_total_issues,
    },
    {
      logo: 'github.svg',
      label: 'Closed Issues',
      value: this.data.coin.gh_closed_issues,
    },
    {
      logo: 'github.svg',
      label: 'Merged Pull Requests',
      value: this.data.coin.gh_pull_requests_merged,
    },
    {
      logo: 'github.svg',
      label: 'PR Contributors',
      value: this.data.coin.gh_pull_request_contributors,
    },
    {
      logo: 'github.svg',
      label: 'Additions',
      value: this.data.coin.gh_additions,
    },
    {
      logo: 'github.svg',
      label: 'Deletions',
      value: this.data.coin.gh_deletions,
    },
    {
      logo: 'github.svg',
      label: 'Commits (4 Weeks)',
      value: this.data.coin.gh_commit_count_4_weeks,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditCoinComponent>,
    private coinsService: CoinsGenericService,
    @Inject(MAT_DIALOG_DATA) public data: { coin: Coin; collectionName: string }
  ) {}

  ngOnInit(): void {
    this.coin = { ...this.data.coin };
    this.initialStatus = this.coin.status;
    console.log('---> ', this.coin);
    this.dialogRef.afterClosed().subscribe(() => {
      if (this.coin.status != this.initialStatus) {
        this.saveChanges();
      }
    });
  }

  saveChanges() {
    const updateData: CoinUpdateData = {
      symbol: this.coin.symbol,
      propertiesToUpdate: {
        status: this.coin.status,
      },
    };
    this.coinsService.updateOne(updateData);
  }
}
